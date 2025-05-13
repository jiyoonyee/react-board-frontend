import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import CreateButton from "../components/layout/CreateButton";

const ContentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contentData, setContentData] = useState(null);
  const index = searchParams.get("index");
  console.log(index);
  const navigate = useNavigate();

  // index값에 맞는 게시글 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://react-board-backend.onrender.com/board_req?index=${index}`
        );
        const data = await response.json();
        setContentData(data[0]);
      } catch (error) {
        console.error("에러:", error);
      }
    };
    fetchData();
  }, []);

  const updateBoardContent = () => {
    navigate(`/writeUpdate?index=${index}`);
  };

  //아이템 삭제
  const deleteBoardItem = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://react-board-backend.onrender.com/delete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ index: index }),
          }
        );
        const data = await response.json();
        alert("삭제가 성공적으로 이루어졌습니다.");
        navigate("/");
      } catch (error) {
        console.error("에러:", error);
      }
    };
    fetchData();
  };
  return (
    <>
      <Wrap>
        {contentData ? (
          <BoardMainContainer>
            <BoardInforWrap>
              <BoardTitle>
                <span>{contentData.board_title}</span>
              </BoardTitle>
              <BoardDetailsWrap>
                <BoardWriter>{contentData.board_writer}</BoardWriter>
                <BoardDay>{contentData.board_write_day.split("T")[0]}</BoardDay>
              </BoardDetailsWrap>
            </BoardInforWrap>
            <BoardContentWrap>
              <BoardContent>{contentData.board_contents}</BoardContent>
            </BoardContentWrap>
          </BoardMainContainer>
        ) : (
          <h2>글을 가져오고 있어요..</h2>
        )}
        <ButtonMenuWrap>
          <CreateButton buttonName={"글 삭제"} clickEvent={deleteBoardItem} />
          <CreateButton
            buttonName={"글 수정"}
            clickEvent={updateBoardContent}
          />
        </ButtonMenuWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  padding: 80px 0px;
`;

const BoardMainContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1000px) {
    width: 90%;
  }
`;

const BoardInforWrap = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  border-top: 1px solid black;
  border-bottom: 1px solid black;
  font-size: 1em;

  & > div {
    height: 50px;
  }
`;

const BoardTitle = styled.div`
  width: 70%;
  display: flex;
  justify-content: start;
  align-items: center;
  & > span {
    padding: 0px 20px;
  }
`;

const BoardDetailsWrap = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BoardWriter = styled.div`
  border-left: 1px solid black;
  border-right: 1px solid black;

  @media (max-width: 1000px) {
    width: 100% !important;
    border-right: 0px;
  }
`;

const BoardDay = styled.div`
  @media (max-width: 1000px) {
    display: none !important;
    width: 0% !important;
  }
`;

const BoardContentWrap = styled.div`
  width: 100%;
  min-height: 50vh;
  border-bottom: 1px solid black;
`;

const BoardContent = styled.div`
  padding: 20px;
`;

const ButtonMenuWrap = styled.div`
  width: 75%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
`;

export default ContentPage;

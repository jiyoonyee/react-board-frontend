import styled from "styled-components";
import BoardList from "../components/atoms/BoardList";
import CreateButton from "../components/layout/CreateButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [getId, setGetId] = useState("");

  const navigate = useNavigate();

  const viewContentsEvent = (e) => {
    // console.log(e.target.parentNode.firstChild.textContent);
    const sendId = e.target.parentNode.firstChild.textContent;
    setGetId(e.target.parentNode.firstChild.textContent);
    console.log(getId);
    navigate("/content");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/board_req?id=${sendId}`
        );
        const data = await response.json();
        console.log(data);
        setSelectBoard(data[0]);
      } catch (error) {
        console.error("에러:", error);
      }
    };
    fetchData();
  };

  return (
    <>
      <Wrap>
        <BoardMainContainer>
          <MainContentsWrap>
            <BoardList getBoardIdFunction={viewContentsEvent} />
          </MainContentsWrap>
          <BoardMenu>
            <div>1 / 2 / 3 / 4 / 5</div>
            <Link to={"/write"}>
              <CreateButton buttonName={"글작성"} />
            </Link>
          </BoardMenu>
        </BoardMainContainer>
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
  padding-top: 80px;
`;

const BoardMainContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 75px;
  @media (max-width: 1000px) {
    width: 90%;
  }
`;

const MainContentsWrap = styled.div`
  width: 100%;
`;

const BoardMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  & > *:nth-child(1) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  & > *:nth-child(2) {
    margin-left: auto;
  }
`;

export default MainPage;

import styled from "styled-components";
import BoardItem from "./BoardItem";
import { useEffect, useState } from "react";
import { use } from "react";

const BoardList = ({ getBoardIdFunction }) => {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://react-board-backend.vercel.app/databases",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setBoardData(data);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (boardData.length != 0) {
      console.log(boardData);
    }
  });

  return (
    <>
      <Wrap>
        <ListRow>
          <p>No</p>
          <p>제목</p>
          <p>작성시간</p>
          <p>작성자</p>
        </ListRow>
        <ListItemWrap>
          {boardData.length > 0 ? (
            boardData.map((item, index) => (
              <BoardItem
                getBoardIdFunction={getBoardIdFunction}
                key={index}
                id={item.board_id}
                title={item.board_title}
                write_day={item.board_write_day}
                writer={item.board_writer}
              />
            ))
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ margin: "10px 0px" }}>글들을 가져오고 있어요..</p>
              </div>
            </>
          )}
        </ListItemWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ListItemWrap = styled.div`
  width: 100%;
  overflow-y: scroll;
  max-height: 600px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1em;
  border-bottom: 1px solid black;
  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    word-break: keep-all;
    padding: 10px 0px;
    height: 20px;
  }

  & > p:nth-child(1) {
    width: 5%;
    @media (max-width: 1000px) {
      width: 10%;
    }
  }
  & > p:nth-child(2) {
    width: 73%;

    @media (max-width: 1000px) {
      width: 78%;
    }
  }
  & > p:nth-child(3) {
    width: 12%;
    @media (max-width: 1000px) {
      display: none;
    }
  }
  & > p:nth-child(4) {
    width: 10%;
    @media (max-width: 1000px) {
      width: 15%;
    }
  }
`;

export default BoardList;

import styled from "styled-components";
import BoardList from "../components/atoms/BoardList";
import CreateButton from "../components/layout/CreateButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MainPage = () => {
  // 메인 페이지에서 게시글 id값 가져오기 -> app.jsx로 넘기기 -> contents.jsx로 넘기기 -> contents.jsx에서 받아온 id값을 기반으로 api 호출

  const navigate = useNavigate();

  const viewContentsEvent = (e) => {
    const sendId = e.target.parentNode.firstChild.textContent;
    navigate(`/content?index=${sendId}`);
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

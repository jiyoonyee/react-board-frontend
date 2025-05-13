import styled from "styled-components";
import BoardList from "../components/atoms/BoardList";
import CreateButton from "../components/layout/CreateButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MainPage = ({ loginState }) => {
  // 메인 페이지에서 게시글 id값 가져오기 -> app.jsx로 넘기기 -> contents.jsx로 넘기기 -> contents.jsx에서 받아온 id값을 기반으로 api 호출

  const navigate = useNavigate();

  const viewContentsEvent = (e) => {
    const sendId = e.target.parentNode.firstChild.textContent;
    navigate(`/content?index=${sendId}`);
  };

  const loginCheckHandle = () => {
    if (!loginState) {
      alert("로그인이 되어 있지 않습니다. 로그인 창으로 이동합니다.");
      navigate("/login");
    } else {
      navigate("/write");
    }
  };
  return (
    <>
      <Wrap>
        <BoardMainContainer>
          <MainContentsWrap>
            <BoardList getBoardIdFunction={viewContentsEvent} />
          </MainContentsWrap>
          <BoardMenu>
            <CreateButton clickEvent={loginCheckHandle} buttonName={"글작성"} />
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
  padding: 80px 0px 20px;
  @media (max-width: 1000px) {
    padding-top: 20px;
  }
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
    gap: 30px;
  }
`;

const MainContentsWrap = styled.div`
  width: 100%;
`;

const BoardMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  position: relative;
`;

export default MainPage;

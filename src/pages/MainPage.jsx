import styled from "styled-components";
import BoardList from "../components/atoms/BoardList";
import CreateButton from "../components/atoms/CreateButton";

const MainPage = () => {
  return (
    <>
      <Wrap>
        <BoardMainContainer>
          <MainContentsWrap>
            <BoardList />
          </MainContentsWrap>
          <BoardMenu>
            <div>1 / 2 / 3 / 4 / 5</div>
            <div>
              <CreateButton buttonName={"글작성"} />
            </div>
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
  gap: 100px;
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

  & > div:nth-child(1) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  & > div:nth-child(2) {
    margin-left: auto;
  }
`;

export default MainPage;

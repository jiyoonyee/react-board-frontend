import styled from "styled-components";
import Header from "./components/layout/Header";
import MainPage from "./pages/mainPage";

const App = () => {
  return (
    <>
      <Wrap>
        <Header></Header>
        <MainPage></MainPage>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;

import Header from "./components/layout/Header";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WritePage from "./pages/WritePage";
import ContentPage from "./pages/ContentPage";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [user, setUser] = useState();
  const [loginState, setLoginState] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://react-board-backend.vercel.app/auth/check",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.loggedIn) {
        setLoginState(data.loggedIn);
        setUser(data.user);
      }
      console.log("데이터 요청", data);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  };

  fetchData();

  const updateLoginState = () => {
    setLoginState(!loginState);
    console.log("갱신 완료");
  };

  const updateUserId = (name) => {
    console.log("유저 이름 갱신 : " + name);
    setUser(name);
  };
  return (
    <>
      <BrowserRouter>
        <Header
          loginState={loginState}
          updateLoginState={updateLoginState}
          updateUserId={updateUserId}
          username={user}
        />
        <Routes>
          <Route
            element={
              <LoginPage
                pageState={true}
                updateUserId={updateUserId}
                updateLoginState={updateLoginState}
              />
            }
            path="/login"
          />
          <Route element={<LoginPage pageState={false} />} path="/signup" />
          <Route
            element={
              <MainPage loginState={loginState} updateUserId={updateUserId} />
            }
            path="/"
          />
          <Route
            element={<WritePage updateState={false} username={user} />}
            path="/write"
          />
          <Route
            element={<WritePage updateState={true} username={user} />}
            path="/writeUpdate"
          />
          <Route element={<ContentPage />} path="/content" />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

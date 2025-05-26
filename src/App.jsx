import Header from "./components/layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WritePage from "./pages/WritePage";
import ContentPage from "./pages/ContentPage";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://3.36.66.10:3000/auth/check", {
          method: "GET",
          credentials: "include", // 세션 쿠키 포함
        });
        const data = await response.json();
        if (data.loggedIn) {
          setLoginState(true);
          setUser(data.user);
        } else {
          setLoginState(false);
          setUser(null);
        }
        console.log("세션 확인 결과:", data);
      } catch (error) {
        console.error("세션 정보 불러오기 실패:", error);
      }
    };

    fetchData();
  }, []);

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

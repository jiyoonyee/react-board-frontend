import Header from "./components/layout/Header";
import MainPage from "./pages/mainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WritePage from "./pages/WritePage";
import ContentPage from "./pages/ContentPage";
import { useState } from "react";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<MainPage />} path="/" />
          <Route element={<WritePage updateState={false} />} path="/write" />
          <Route
            element={<WritePage updateState={true} />}
            path="/writeUpdate"
          />
          <Route element={<ContentPage />} path="/content" />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

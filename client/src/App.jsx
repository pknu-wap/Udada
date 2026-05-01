import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import KakaoCallback from "./pages/KakaoCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인트로 페이지 */}
        <Route path="/" element={<Intro />} />

        {/* 홈 페이지 (Navbar 포함) */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* 🔥 추가 (여기 안에 넣어야 함) */}
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Postdetail from "./pages/Postdetail";
import KakaoCallback from "./pages/KaKaoCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인트로 페이지 */}
        <Route path="/" element={<Intro />} />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* 카카오 콜백 */}
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />

        {/* 홈 페이지 */}
        <Route path="/home" element={<><Navbar /><Home /></>} />

        {/* 공지사항 상세 페이지 */}
        <Route path="/post/:id" element={<><Navbar /><Postdetail /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
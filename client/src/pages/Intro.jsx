import "./Intro.css";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="intro">
      <div className="intro-container">
        <img src="/udada-logo.png" alt="UDADA 로고" className="logo-image" />
        <p className="description">서비스 소개 - 서브</p>
        <button className="login-btn" onClick={() => navigate("/login")}>
          로그인
        </button>
        <footer className="footer-text">
          서비스 소개 | 이용약관 | 개인정보처리방침 | 문의하기
          <br />
          우리 학교의 모든 정보를 한눈에, 우다다(UDADA)
        </footer>
      </div>
    </div>
  );
}

export default Intro;
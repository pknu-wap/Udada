import "./Intro.css";
import { useNavigate } from "react-router-dom";

function Intro() {
const navigate = useNavigate();
  return (
    <div className="intro">
      <div className="intro-container">
        <img src="/udada-logo.png" alt="UDADA 로고" className="logo-image" />
        <p className="description">우다다는 흩어져있는 공지사항들을 한눈에 볼 수 있게 하는 서비스입니다.<br /> 우리 학교에 대해 다 알려드릴게요!</p>
        <button className="login-btn" onClick={() => navigate("/login")}>
          로그인
        </button>
        <footer className="footer-text">
          우리 학교의 모든 정보를 한눈에, 우다다(UDADA)
        </footer>
      </div>
    </div>
  );
}

export default Intro;
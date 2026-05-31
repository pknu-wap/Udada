import "./Login.css";
import { KAKAO_AUTH_URL } from "../api/api";

export default function Login() {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/udada-logo.png" alt="UDADA 로고" className="login-logo" />
        <p className="login-title">우리 학교의 모든 정보가 한눈에!</p>
        <p className="login-sub">카카오톡으로 간편하게 시작하세요.</p>
        <button className="kakao-btn" onClick={handleKakaoLogin}>
          💬 카카오톡으로 계속하기
        </button>
      </div>
    </div>
  );
}
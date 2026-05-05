import "./Intro.css";

function Intro() {
  const handleKakaoLogin = () => {
    const REST_API_KEY = "35ee70385d55e7d205867dc2788f35b4";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";

    const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = KAKAO_URL;
  };

  return (
    <div className="intro">
      <div className="intro-container">
      <img src="/udada-logo.png" alt="UDADA 로고" className="logo-image" />

        <p className="description">서비스 소개 - 서브</p>

        <button className="login-btn" onClick={handleKakaoLogin}>
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
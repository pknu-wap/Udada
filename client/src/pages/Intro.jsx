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
        <h1 className="logo">UDADA</h1>

        <p className="description">
          우리 학교 다 알려드림
          <br />
          모든 공지를 한눈에 알려드립니다.
        </p>

        <button className="login-btn" onClick={handleKakaoLogin}>
          카카오 로그인
        </button>
      </div>
    </div>
  );
}

export default Intro;
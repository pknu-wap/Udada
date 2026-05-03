import "./Intro.css";

function Intro() {
  return (
    <div className="intro">
      <div className="intro-container">
        <h1 className="logo">UDADA</h1>

        <p className="description">
          우리 학교 다 알려드림
          <br />
          모든 공지를 한눈에 알려드립니다.
        </p>

        <button className="login-btn">
          로그인
        </button>
      </div>
    </div>
  );
}

export default Intro;
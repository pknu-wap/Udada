import"./Login.css";

export default function Login() {
  return (
    <div className="container">
        <div className="box">
      <h2>로그인</h2>

      <input type="text" placeholder="아이디" />
      <br />

      <input type="password" placeholder="비밀번호" />
      <br />

      <button>로그인</button>
    </div>
</div>
  );
}
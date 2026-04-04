import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <Link to="/">홈</Link> |{" "}
      <Link to="/login">로그인</Link>
    </div>
  );
}
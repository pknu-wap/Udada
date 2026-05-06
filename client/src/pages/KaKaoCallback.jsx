import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function KakaoCallback() {
  const location = useLocation();
const navigate = useNavigate();
  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (!code) return;
    fetch("http://localhost:3000/api/v1/auth/kakao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("서버 응답:", data);
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.error("에러:", err);
      });

  }, [location.search]);

  return <div>로그인 처리 중...</div>;
}

export default KakaoCallback;
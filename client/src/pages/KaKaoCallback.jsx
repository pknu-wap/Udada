import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function KakaoCallback() {
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");

    console.log("인가 코드:", code);

    if (!code) return;

    console.log("🔥 fetch 실행됨");

    fetch(`http://localhost:3000/api/v1/auth/kakao?code=${code}`, {
      method: "POST",
    })
      .then((res) => {
        console.log("응답 받음", res);
        return res.json();
      })
      .then((data) => {
        console.log("서버 응답:", data);
      })
      .catch((err) => {
        console.error("에러:", err);
      });

  }, [location.search]);

  return <div>로그인 처리 중...</div>;
}

export default KakaoCallback;
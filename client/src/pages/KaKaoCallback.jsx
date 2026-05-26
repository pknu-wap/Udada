import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function KakaoCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    if (!code) return;

    fetch(`http://34.47.85.214:3000/api/v1/auth/kakao?code=${code}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("서버 응답:", data);
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/home"); // 인트로 페이지로 이동 (필요시 "/home"으로 변경)
        } else {
          console.error("accessToken 없음:", data);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("에러:", err);
        navigate("/login");
      });
  }, [location.search]);

  return <div>로그인 처리 중...</div>;
}

export default KakaoCallback;
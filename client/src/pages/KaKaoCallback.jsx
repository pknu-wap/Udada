import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { kakaoLogin } from "../api/authApi";
import useAuth from "../hooks/useAuth";
import { debug } from "../utils/log";

const KakaoCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const [error, setError] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; // 이미 실행됐으면 스킵 (한 번 실행 보장)
    hasRun.current = true;

    const code = searchParams.get("code");

    if (!code) {
      setError("인가 코드가 없습니다.");
      return;
    }

    const handleLogin = async () => {
      try {
        const res = await kakaoLogin(code);
        debug(res);

        // JWT 토큰 저장
        saveToken(res.data.accessToken);

        // 신규 유저 → 이메일 등록 화면
        // 기존 유저 → 메인 화면
        if (res.data.newUser) {
          navigate("/email-input", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      } catch (e) {
        console.error("카카오 로그인 실패:", e);
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    };

    handleLogin();
  }, []);

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.errorText}>{error}</p>
        <button style={styles.retryButton} onClick={() => navigate("/login")}>
          다시 시도하기
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
      <p style={styles.loadingText}>로그인 처리 중...</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    gap: "16px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f0f0f0",
    borderTop: "4px solid #FEE500",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    color: "#888",
    fontSize: "14px",
  },
  errorText: {
    color: "#e53e3e",
    fontSize: "15px",
  },
  retryButton: {
    padding: "12px 24px",
    backgroundColor: "#FEE500",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

// spinner 애니메이션
const styleSheet = document.createElement("style");
styleSheet.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

export default KakaoCallback;

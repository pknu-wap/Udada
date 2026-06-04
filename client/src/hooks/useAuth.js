import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../api/api";
import { debug } from "../utils/log";

const useAuth = () => {
  const navigate = useNavigate();

  // 토큰 저장
  const saveToken = useCallback((token) => {
    debug("saveToken(): token=", token);
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }, []);

  // 토큰 조회
  const getToken = useCallback(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }, []);

  // 로그아웃
  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    navigate("/login");
  }, [navigate]);

  // 로그인 여부
  const isLoggedIn = useCallback(() => {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }, []);

  return { saveToken, getToken, logout, isLoggedIn };
};

export default useAuth;

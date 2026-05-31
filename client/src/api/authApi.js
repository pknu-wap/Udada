import api from "./instance";

// 카카오 로그인 (인가 코드 → JWT 발급)
export const kakaoLogin = async (code) => {
  const response = await api.post(`/auth/kakao?code=${code}`);
  return response.data;
};

// 이메일 등록
export const registerEmail = async (email) => {
  const response = await api.post("/users/email", { email });
  return response.data;
};

export default api;

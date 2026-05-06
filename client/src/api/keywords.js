import API_BASE_URL from "./api";

// 키워드 목록 조회
export const getKeywords = async () => {
  const response = await fetch(`${API_BASE_URL}/keywords`);
  const data = await response.json();

  return data;
};

// 키워드 추가
export const addKeyword = async (keyword) => {
  const response = await fetch(`${API_BASE_URL}/keywords`, {
    method: "POST",
    headers: {
  "Content-Type": "application/json",
},
    body: JSON.stringify({ keyword }),
  });

  const data = await response.json();

  return data;
};
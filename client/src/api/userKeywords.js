import API_BASE_URL from "./api";

// 내 키워드 목록 조회
export const getUserKeywords = async () => {
  const response = await fetch(`${API_BASE_URL}/user-keywords`);
  const data = await response.json();

  return data;
};

// 내 키워드 추가
export const addUserKeyword = async (keywordId) => {
  const response = await fetch(`${API_BASE_URL}/user-keywords`, {
    method: "POST",
    headers: {
  "Content-Type": "application/json",
},
    body: JSON.stringify({ keywordId }),
  });

  const data = await response.json();

  return data;
};

// 내 키워드 삭제
export const deleteUserKeyword = async (keywordId) => {
  const response = await fetch(
    `${API_BASE_URL}/user-keywords/${keywordId}`,
    {
      method: "DELETE",
    }
  );

  return response;
};
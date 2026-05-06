import API_BASE_URL from "./api";

// 북마크 목록 조회
export const getBookmarks = async () => {
  const response = await fetch(`${API_BASE_URL}/bookmarks`);
  const data = await response.json();

  return data;
};

// 북마크 추가
export const addBookmark = async (noticeId) => {
  const response = await fetch(`${API_BASE_URL}/bookmarks`, {
    method: "POST",
    headers: {
  "Content-Type": "application/json",
},
    body: JSON.stringify({ noticeId }),
  });

  const data = await response.json();

  return data;
};

// 북마크 삭제
export const deleteBookmark = async (bookmarkId) => {
  const response = await fetch(
    `${API_BASE_URL}/bookmarks/${bookmarkId}`,
    {
      method: "DELETE",
    }
  );

  return response;
};
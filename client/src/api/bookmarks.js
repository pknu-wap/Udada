import api from './instance';

// 북마크 목록 조회
export const getBookmarks = () => {
  return api.get('/bookmarks');
};

// 북마크 추가
export const addBookmark = (noticeId) => {
  return api.post('/bookmarks', { noticeId });
};

// 북마크 삭제
export const deleteBookmark = (bookmarkId) => {
  return api.delete(`/bookmarks/${bookmarkId}`);
};
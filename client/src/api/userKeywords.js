import api from './instance';

// 알림 키워드 설정 목록 조회
export const getUserKeywords = () => {
  return api.get('/user-keywords');
};

// 알림 키워드 설정 추가
export const addUserKeyword = (keywordId) => {
  return api.post('/user-keywords', { keywordId });
};

// 알림 키워드 설정 해제
export const deleteUserKeyword = (userKeywordId) => {
  return api.delete(`/user-keywords/${userKeywordId}`);
};
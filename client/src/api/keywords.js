import api from './instance';

// 키워드 목록 조회
export const getKeywords = () => {
  return api.get('/keywords');
};

// 키워드 추가
export const addKeyword = (word) => {
  return api.post('/keywords', { word });
};

// 키워드 수정, 삭제는 금요일 회의 후 추가 예정
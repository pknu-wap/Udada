import api from './instance';

// 공지사항 목록 조회
export const getNotices = (params = {}) => {
  return api.get('/notices', { params });
};

// 공지사항 상세 조회
export const getNoticeDetail = (noticeId) => {
  return api.get(`/notices/${noticeId}`);
};
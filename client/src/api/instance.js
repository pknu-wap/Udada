import axios from 'axios';

const api = axios.create({
  baseURL: 'http://34.47.85.214:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청할 때마다 자동으로 JWT 토큰 붙여주는 설정
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
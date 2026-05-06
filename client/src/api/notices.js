import API_BASE_URL from "./api";

export const getNotices = async () => {
  const response = await fetch(`${API_BASE_URL}/notices`);
  const data = await response.json();

  return data;
};
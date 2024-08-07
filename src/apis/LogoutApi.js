import axios from 'axios';

const baseUrl = 'https://i11e206.p.ssafy.io';

export const logout = async () => {
  try {
    const response = await axios.delete(`${baseUrl}/api/auth`, {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (error) {
    console.error(
      '로그아웃 실패:',
      error.response ? error.response.data : error.message
    );
    return false;
  }
};

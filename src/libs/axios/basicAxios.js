import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://i11e206.p.ssafy.io/api',
  withCredentials: true,
});

export default instance;

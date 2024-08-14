import axios from 'axios';
import { persistor } from '../store/store';
import { useNavigate } from 'react-router-dom';
import basicAxios from '../libs/axios/basicAxios';

export const logout = async () => {
  try {
    basicAxios({
      method: 'delete',
      url: `/auth`,
    });
  } catch (err) {
    throw err;
  } finally {
    await persistor.purge();
  }
};

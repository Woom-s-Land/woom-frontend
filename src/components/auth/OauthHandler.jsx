import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authActions } from '../../store/authSlice';

const baseUrl = 'http://i11e206.p.ssafy.io';

const OauthHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users/info`, {
          withCredentials: true,
        });

        dispatch(authActions.setUserInfo(response.data));
        dispatch(authActions.login());
        navigate('/');
        console.log('유저 정보 요청 성공', response);
      } catch (error) {
        console.error('유저 정보 요청 실패', error);
        navigate('/login');
      }
    };

    getUserInfo();
  }, [navigate, dispatch]);

  return <div>로그인 중입니다...</div>;
};

export default OauthHandler;

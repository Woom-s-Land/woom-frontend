import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    userEmail: '',
    userPassword: '',
  });
  // 이메일 형식 안맞으면 경고 메시지 띄우기, 로그인 버튼 비활성화

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth', {
        userEmail: values.userEmail,
        userPassword: values.userPassword,
      });
      dispatch(authActions.login());
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const socialLogin = async (provider) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/oauth2/authorization/${provider}`
      );

      console.log(response.data);
    } catch (error) {
      console.error('Error during social login:', error);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='userEmail'>Email</label>
          <input
            type='email'
            name='userEmail'
            id='userEmail'
            value={values.userEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='userPassword'>Password</label>
          <input
            type='password'
            name='userPassword'
            id='userPassword'
            value={values.userPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button>로그인</button>
      </form>
      <button onClick={() => socialLogin('google')}>GOOGLE</button>
      <button onClick={() => socialLogin('github')}>GITHUB</button>
      {/* github 버튼 올릴 시 안내 사항 멘트 */}
    </div>
  );
};

export default Login;

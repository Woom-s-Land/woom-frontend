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
  const [isValidEmail, setIsValidEmail] = useState(true);

  // input 값이 변경될 때마다 로그인 정보를 업데이트하는 함수
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // 이메일 입력 종료되면 이메일 형식을 검증하는 함수
  const handleBlur = (e) => {
    const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');

    setIsValidEmail(emailRegex.test(values.userEmail));
  };

  // 일반 로그인 요청을 보내는 함수
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
  // 소셜 로그인 요청을 보내는 함수
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
          {!isValidEmail && <small>이메일 형식이 올바르지 않습니다.</small>}
          <input
            type='email'
            name='userEmail'
            id='userEmail'
            value={values.userEmail}
            onChange={handleChange}
            onBlur={handleBlur}
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
        <button type='submit' disabled={!isValidEmail}>
          로그인
        </button>
      </form>
      <button onClick={() => socialLogin('google')}>GOOGLE</button>
      <button onClick={() => socialLogin('github')}>GITHUB</button>
      {/* github 버튼 hover시에만 출력 */}
      <small>github 프로필에서 public email 설정이 필요합니다.</small>
    </div>
  );
};

export default Login;

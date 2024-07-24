import { useState } from 'react';

const Signup = () => {
  const [values, setValues] = useState({
    userEmail: '',
    userPassword: '',
  });

  return (
    <div>
      <h1>회원가입</h1>
      <form>
        <div>
          <label htmlFor='userEmail'>이메일</label>
          <input type='email' id='userEmail' name='userEmail' />
        </div>
        <div>
          <label htmlFor='userPassword'>비밀번호</label>
          <input type='password' id='userPassword' name='userPassword' />
        </div>
        <button type='submit'>회원가입</button>
      </form>
    </div>
  );
};

export default Signup;

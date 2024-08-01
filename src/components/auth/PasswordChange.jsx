import { useState } from 'react';
import axios from 'axios';

import Modal from '../common/Modal';
import Button from '../common/Button';

const baseUrl = 'http://i11e206.p.ssafy.io';

const PasswordChange = ({ onClose }) => {
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [message, setMessage] = useState('');

  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordCheck: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'newPassword') {
      const passwordRegex = new RegExp(
        '^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$'
      );
      setIsValidPassword(passwordRegex.test(value));
      if (!isValidPassword) {
        setMessage(
          '비밀번호는 8자 이상 16자 이하로, 영문, 숫자, 특수문자를 포함해야 합니다.'
        );
      } else {
        setMessage('');
      }
    } else if (name === 'newPasswordCheck') {
      setIsPasswordMatch(value === values.newPassword);

      if (!isPasswordMatch) {
        setMessage('비밀번호가 일치하지 않습니다.');
      } else {
        setMessage('');
      }
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const savePassword = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/users/password`,
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        { withCredentials: true }
      );

      console.log('비밀번호 변경 성공', response);
      setMessage('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      setMessage('현재 비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      console.error('비밀번호 변경 실패', error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <section>
        <div>
          <label htmlFor='oldPassword'>현재 비밀번호</label>
          <input
            type='password'
            id='oldPassword'
            name='oldPassword'
            value={values.oldPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='newPassword'>새 비밀번호</label>
          <input
            type='password'
            id='newPassword'
            name='newPassword'
            value={values.newPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='newPasswordCheck'>새 비밀번호 확인</label>
          <input
            type='password'
            id='newPasswordCheck'
            name='newPasswordCheck'
            value={values.newPasswordCheck}
            onChange={handleChange}
          />
        </div>
        {(!isValidPassword || !isPasswordMatch) && (
          <p className='mt-2 text-xs text-red-600'>{message}</p>
        )}
        <Button
          label={'저장'}
          onClick={savePassword}
          disabled={!isValidPassword || !isPasswordMatch}
        />
      </section>
    </Modal>
  );
};

export default PasswordChange;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import PasswordChange from '../auth/PasswordChange';
import Button from '../common/Button';

const baseUrl = 'http://i11e206.p.ssafy.io';

const MyInfo = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [costume, setCostume] = useState(userInfo.costume);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const saveInfo = () => {
    console.log(nickname, costume);
  };

  const handleChange = (e) => {
    const [name, value] = e.target;
  };

  return (
    <div>
      <h1>My Info</h1>
      <input type='text' value={nickname} onChange={handleChange} />
      <input type='text' value={userInfo.email} disabled />
      <button onClick={handleModal}>비밀번호 변경</button>
      {isModalOpen && <PasswordChange onClose={handleModal} />}
      <Button label={'저장'} onClick={saveInfo}></Button>
    </div>
  );
};

export default MyInfo;

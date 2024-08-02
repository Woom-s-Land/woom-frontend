import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Modal from '../common/Modal';
import Button from '../common/Button';
import PasswordChange from '../auth/PasswordChange';

import char_1 from '../../assets/char_1/char_1 (0_0).png';
import rightBtn from '../../assets/button/right-bt-up.png';
import leftBtn from '../../assets/button/left-bt-up.png';
import dialogImg from '../../assets/dialog/dialog box big.png';

const baseUrl = 'https://i11e206.p.ssafy.io';
const costumeList = [];

const MyInfo = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [costume, setCostume] = useState(userInfo.costume);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [costumeNum, setCostumeNum] = useState(0);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const changeInfo = () => {};

  const handleChange = (e) => {
    const [name, value] = e.target;
  };

  const handleLeft = () => {
    setCostumeNum((costumeNum - 1) % costumeList.length);
  };

  const handleright = () => {
    setCostumeNum((costumeNum + 1) % costumeList.length);
  };

  return (
    <Modal>
      <div className='relative flex justify-between items-center mb-6'>
        <section className='flex flex-col items-center w-1/2'>
          <div className='flex w-full items-center justify-center'>
            <img
              src={leftBtn}
              alt='leftBtn'
              className='w-1/12 cursor-pointer'
            />
            <img src={char_1} alt='char_1' className='w-2/3' />
            <img
              src={rightBtn}
              alt='rightBtn'
              className='w-1/12 cursor-pointer'
            />
          </div>
        </section>
        <section className='flex flex-col items-center w-1/2 space-y-2'>
          <div className='relative w-11/12 max-w-sm'>
            <img src={dialogImg} alt='대화 상자' className='w-full h-24' />
            <input
              type='text'
              value={nickname}
              onChange={handleChange}
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 p-2 bg-transparent border border-transparent rounded focus:outline-none text-xl'
            />
          </div>
          <div className='relative w-11/12 max-w-sm'>
            <img src={dialogImg} alt='대화 상자' className='w-full h-24' />
            <input
              type='text'
              value={userInfo.email}
              disabled
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 p-2 bg-transparent border border-transparent rounded focus:outline-none text-xl'
            />
          </div>
          <div className='relative w-11/12 max-w-sm'>
            <img src={dialogImg} alt='대화 상자' className='w-full h-24' />
            <button
              onClick={handleModal}
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 p-2 bg-transparent border border-transparent rounded focus:outline-none text-xl text-left'
            >
              비밀번호 변경
            </button>
          </div>
        </section>
        <div className='absolute left-1/2 right-1/2  translate-y-[182px]'>
          <Button label={'저장'} onClick={changeInfo}></Button>
        </div>
      </div>
      {isModalOpen && <PasswordChange onClose={handleModal} />}
    </Modal>
  );
};

export default MyInfo;

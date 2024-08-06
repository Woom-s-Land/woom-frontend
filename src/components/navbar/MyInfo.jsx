import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { authActions } from '../../store/authSlice';

import Modal from '../common/Modal';
import Button from '../common/Button';
import PasswordChange from './PasswordChange';
// todo: 캐릭터 assets 정리 후 수정 예정
import char_1 from '../../assets/char_1/char_1 (0_0).png';
import rightBtn from '../../assets/button/right-bt-up.png';
import leftBtn from '../../assets/button/left-bt-up.png';
import dialogImg from '../../assets/dialog/dialog box big.png';

const baseUrl = 'https://i11e206.p.ssafy.io';
// todo: 캐릭터 assets 정리 후 수정 예정
const costumeList = [
  'd0',
  'd1',
  'd2',
  'd3',
  'd4',
  'd5',
  'd6',
  'd7',
  'd8',
  'd9',
  'd10',
  'd11',
  'd12',
];

const MyInfo = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [costume, setCostume] = useState(userInfo.costume);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g, '');
    let byteCount = 0;
    let finalValue = '';

    for (let i = 0; i < value.length; i++) {
      const char = value[i];

      byteCount += char.charCodeAt(0) > 127 ? 2 : 1; // 한글은 3바이트, 그 외는 1바이트
      if (byteCount > 14) break;
      finalValue += char;
    }

    setNickname(finalValue);
  };

  const handleLeft = () => {
    setCostume(costume - 1 < 0 ? costumeList.length - 1 : costume - 1);
    console.log(costume);
  };

  const handleright = () => {
    setCostume((costume + 1) % costumeList.length);
    console.log(costume);
  };

  const changeInfo = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/users/character`,
        {
          nickname: nickname,
          costume: costume,
        },
        { withCredentials: true }
      );
      console.log(response);
      dispatch(
        authActions.setUserInfo({
          nickname: nickname,
          costume: costume,
          email: userInfo.email,
        })
      );
    } catch (err) {
      console.error(err);
    }
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
              onClick={handleLeft}
            />
            {/* 캐릭터 assets 정리 후 이미지 경로 수정 예정(동적으로 변경 예정) */}
            <img src={char_1} alt='char_1' className='w-2/3' />
            <img
              src={rightBtn}
              alt='rightBtn'
              className='w-1/12 cursor-pointer'
              onClick={handleright}
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
        <div className='absolute translate-y-[182px] left-1/2 transform -translate-x-1/2'>
          <Button label={'저장'} onClick={changeInfo}></Button>
        </div>
      </div>
      {isModalOpen && <PasswordChange onClose={handleModal} />}
    </Modal>
  );
};

export default MyInfo;

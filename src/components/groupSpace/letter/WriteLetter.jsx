import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import letter from '../../../assets/letter/letter.png';

const baseUrl = 'https://i11e206.p.ssafy.io';
// todo: 유저 닉네임 받아와서 OOO 올림 보여주기
// todo: 편지 모달창 닫는 버튼 추가
const WriteLetter = ({
  onClose,
  onChange,
  userNickname,
  sendDateTime,
  onNext,
}) => {
  const [content, setContent] = useState('');
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className='relative flex justify-center items-center w-full'>
      <img src={letter} alt='letter' className='w-2/5' />
      <div className='absolute w-2/5 h-4/5 flex flex-col items-center'>
        <div className='absolute -top-9 left-8'>
          <span className='text-xl'>{userNickname}aaaaaaaaaaaa</span>
          <span className='text-xl'>에게</span>
        </div>
        <textarea
          value={content}
          onChange={handleContentChange}
          className='absolute w-11/12 h-2/3 p-4 rounded resize-none bg-transparent mt-4 overflow-hidden focus:outline-none'
          placeholder='편지를 입력하세요... (500자 이내)'
        />
        <div className='absolute bottom-20 right-2 p-4 flex flex-col items-end'>
          <h2 className='text-lg'>
            {new Date(sendDateTime).toLocaleDateString()}
          </h2>
          {/* todo: 유저 닉네임으로 수정 예정 */}
          <h2 className='text-xl'>
            {/* {userInfo.nickname} 올림 */}
            안녕안녕안녕안 올림
          </h2>
        </div>
        <button
          onClick={onNext}
          className='py-2 px-4 bg-transparent rounded mb-0 absolute bottom-0 right-2'
        >
          도착 날짜 고르기
        </button>
      </div>
    </div>
  );
};

export default WriteLetter;

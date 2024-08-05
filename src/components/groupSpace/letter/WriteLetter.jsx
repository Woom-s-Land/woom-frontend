import { useState } from 'react';
import { useSelector } from 'react-redux';

import letter from '../../../assets/letter/letter.png';

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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='relative w-2/6 flex flex-col items-center'>
        <img src={letter} alt='letter' className='w-full' />
        <div className='absolute top-0 w-full h-full flex flex-col items-center'>
          <div className='absolute top-6 left-[34px]'>
            <span className='text-xl'>{userNickname}녕안녕안녕안녕</span>
            <span className='text-xl'>에게</span>
          </div>
          <textarea
            value={content}
            onChange={handleContentChange}
            className='absolute top-14 w-11/12 h-2/3 p-4 rounded resize-none bg-transparent overflow-hidden focus:outline-none leading-relaxed'
            placeholder='편지를 입력하세요!'
            maxLength={350}
          />
          <div className='absolute bottom-36 right-2 p-4 flex flex-col items-end'>
            <p className='text-lg'>
              {new Date(sendDateTime).toLocaleDateString()}
            </p>
            {/* todo: 유저 닉네임으로 수정 예정 */}
            <p className='text-lg'>
              {userInfo ? userInfo.nickname : '안녕안녕안녕안'} 올림
            </p>
          </div>
          <button
            onClick={onNext}
            className='py-2 px-4 bg-transparent rounded mb-0 absolute bottom-12 right-2'
          >
            편지 도착 날짜 선택
          </button>
          <button
            onClick={onClose}
            className='py-2 px-4 bg-transparent rounded mb-0 absolute bottom-3 right-2'
          >
            편지 다음에 쓰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteLetter;

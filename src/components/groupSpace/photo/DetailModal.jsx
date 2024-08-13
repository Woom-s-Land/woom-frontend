import React, { useEffect, useState } from 'react';
import Modal from '../../common/Modal';
import { GroupPhotoApi } from '../../../apis/GroupSpaceApi';
import { useSelector } from 'react-redux';

const DetailModal = ({ imageId, onClose }) => {
  const [image, setImage] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const pathname = window.location.pathname;
  const woomsId = pathname.split('/')[2];

  const userInfo = useSelector((state) => state.auth.userInfo);
  const userNickname = userInfo.nickname || ''; // 사용자 닉네임을 가져옵니다

  useEffect(() => {
    const getImageDetail = async () => {
      try {
        const data = await GroupPhotoApi.getPhotoDetail(woomsId, imageId);
        // console.log(data.nickname);
        setImage(data);
        console.log(userNickname);
        console.log('이미지', image);
        // console.log('디테일 페이지 데이터', data);
      } catch (error) {
        console.error('디테일 페이지 에러', error);
      }
    };

    getImageDetail();
  }, [woomsId, imageId]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // 이미지 로딩 완료 후 userNickname과 image.nickName 비교
  const canFlip = image && image.nickname === userNickname;

  return (
    <Modal onClose={onClose}>
      <div className='flex justify-center items-center h-screen'>
        <div className='relative w-[300px] h-[350px] perspective-1000'>
          <div
            className={`relative w-full h-full transition-transform duration-600 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
          >
            <div
              className={`absolute w-full h-full backface-hidden ${isFlipped ? 'hidden' : ''}`}
            >
              <img
                src={image?.path}
                alt='Front'
                className='w-full h-full object-contain'
              />
            </div>
            <div
              className={`absolute w-full h-full bg-base-color text-white flex items-center justify-center text-2xl backface-hidden ${isFlipped ? 'block' : 'hidden'} rotate-y-180`}
            >
              정훈이 뒤집었다 이말이다
            </div>
          </div>
        </div>
        {canFlip && (
          <button
            onClick={handleClick}
            className='absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded'
          >
            뒤집기
          </button>
        )}
      </div>
    </Modal>
  );
};

export default DetailModal;

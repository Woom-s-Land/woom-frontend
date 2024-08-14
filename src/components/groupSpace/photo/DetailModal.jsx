import React, { useEffect, useState } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import { GroupPhotoApi } from '../../../apis/GroupSpaceApi';
import { useSelector } from 'react-redux';

const DetailModal = ({ imageId, onClose }) => {
  const [image, setImage] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const pathname = window.location.pathname;
  const woomsId = pathname.split('/')[2];

  const userInfo = useSelector((state) => state.auth.userInfo);
  const userNickname = userInfo.nickname || '';

  useEffect(() => {
    const getImageDetail = async () => {
      try {
        const data = await GroupPhotoApi.getPhotoDetail(woomsId, imageId);
        console.log('받아온 데이터:', data);
        setImage(data);
        setIsFlipped(data.flipped); // 초기 flip 상태 설정
      } catch (error) {
        console.error('디테일 페이지 에러', error);
      }
    };

    getImageDetail();
  }, [woomsId, imageId]);

  // useEffect(() => {
  //   if (image) {
  //     console.log('이미지 상태가 업데이트되었습니다:', image);
  //   }
  // }, [image]);

  // const handleClick = async () => {
  //   try {
  //     await GroupPhotoApi.patchPhoto(woomsId, imageId);
  //     setIsFlipped(!isFlipped);
  //   } catch (error) {
  //     console.error('Error updating flip status:', error);
  //   }
  // };

  // const canFlip = image && image.nickname === userNickname;

  return (
    <Modal onClose={onClose}>
      <div className='flex justify-center items-start h-screen pt-11'>
        <div className='relative w-[300px] h-[350px] perspective-1000'>
          <div
            className={`relative w-full h-full transition-transform duration-600 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
          >
            {/* <div
              className={`absolute w-full h-full backface-hidden ${isFlipped ? 'hidden' : ''}`}
            > */}
            <img
              src={image?.path}
              alt='Front'
              className='w-full h-full object-contain'
            />
            {/* </div> */}
            {/* <div
              className={`absolute w-full h-full bg-base-color text-white flex items-center justify-center text-2xl backface-hidden ${isFlipped ? 'block' : 'hidden'} rotate-y-180`}
            >
              {image?.nickname}이(가) 뒤집음!
            </div> */}
          </div>
        </div>
        {/* <div className='absolute flex justify-center items-center bottom-3'>
          {canFlip && <Button label='뒤집기' onClick={handleClick} />}
        </div> */}
      </div>
    </Modal>
  );
};

export default DetailModal;

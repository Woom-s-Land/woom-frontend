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
  const userNickname = userInfo.nickname || ''; // 사용자 닉네임을 가져옵니다

  useEffect(() => {
    const getImageDetail = async () => {
      try {
        const data = await GroupPhotoApi.getPhotoDetail(woomsId, imageId);
        console.log('받아온 데이터:', data); // 데이터를 바로 콘솔에 출력
        setImage(data); // 상태 업데이트
      } catch (error) {
        console.error('디테일 페이지 에러', error);
      }
    };

    getImageDetail();
  }, [woomsId, imageId]);

  useEffect(() => {
    if (image) {
      console.log('이미지 상태가 업데이트되었습니다:', image);
    }
  }, [image]); // image 상태가 변경될 때마다 로그 출력

  const handleClick = async () => {
    try {
      // patchPhoto 함수를 사용해 서버에 flip 상태를 업데이트합니다.
      await GroupPhotoApi.patchPhoto(woomsId, imageId);
      // 로컬 상태 업데이트
      setIsFlipped(!isFlipped);
    } catch (error) {
      console.error('Error updating flip status:', error);
    }
  };

  // 이미지 로딩 완료 후 userNickname과 image.nickName 비교
  const canFlip = image && image.nickname === userNickname;

  return (
    <Modal onClose={onClose}>
      <div className='flex justify-center items-start h-screen pt-5'>
        {' '}
        {/* pt-8로 상단 여백 추가 */}
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
              {image?.nickname}이(가) 뒤집음!
            </div>
          </div>
        </div>
        <div className='absolute flex justify-center items-center bottom-3'>
          {canFlip && <Button label='뒤집기' onClick={handleClick} />}
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;

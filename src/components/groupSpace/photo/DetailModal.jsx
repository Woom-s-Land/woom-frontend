import React, { useEffect, useState } from 'react';
import Modal from '../../common/Modal';
import Loading from '../../common/Loading'; // Loading 컴포넌트를 임포트합니다.
import { GroupPhotoApi } from '../../../apis/GroupSpaceApi';
import { alertActions } from '../../../store/alertSlice';

const DetailModal = ({ imageId, onClose }) => {
  const [image, setImage] = useState(null); // 이미지 데이터를 저장할 상태
  const [isFlipped, setIsFlipped] = useState(false); // 이미지 플립 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 state를 추가합니다.
  const pathname = window.location.pathname;
  const woomsId = pathname.split('/')[2];

  useEffect(() => {
    const getImageDetail = async () => {
      try {
        setIsLoading(true); // API 호출 전에 로딩 상태를 true로 설정합니다.
        const data = await GroupPhotoApi.getPhotoDetail(woomsId, imageId);
        setImage(data);
        setIsFlipped(data.flipped); // 초기 flip 상태 설정
      } catch (error) {
        alertActions.showAlert({
          message:
            '해당 사진 정보를 불러오는 데 실패하였습니다. 다시 시도해주세요.',
          type: 'ERROR',
        });
      } finally {
        setIsLoading(false); // API 호출이 끝난 후 로딩 상태를 false로 설정합니다.
      }
    };

    getImageDetail();
  }, [woomsId, imageId]);

  return (
    <Modal onClose={onClose}>
      {isLoading ? ( // 로딩 상태일 때 Loading 컴포넌트를 표시합니다.
        <Loading />
      ) : (
        <div className='flex justify-center items-start h-screen pt-11'>
          <div className='relative w-[300px] h-[350px] perspective-1000'>
            <div
              className={`relative w-full h-full transition-transform duration-600 `}
            >
              <img
                src={image?.path}
                alt='Front'
                className='w-full h-full object-contain'
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailModal;

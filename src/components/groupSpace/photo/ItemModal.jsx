import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import { GroupPhotoApi } from '../../../apis/GroupSpaceApi';

const ItemModal = ({ group, onImageClick, onClose }) => {
  const itemsPerPage = 6; // 한 페이지당 표시할 이미지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [images, setImages] = useState([]); // 이미지를 저장할 상태
  const [hasMore, setHasMore] = useState(false); // 더 많은 데이터가 있는지 여부
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log(group.date);
        // group.woomsId와 group.date를 사용하여 이미지를 받아오는 API 호출
        const data = await GroupPhotoApi.getPhoto(
          group.woomsId,
          currentPage,
          group.date
        );

        console.log(data);
        setImages(data); // 기존 이미지에 새 이미지 추가
        setHasMore(data.length === itemsPerPage); // 받아온 데이터가 itemsPerPage와 같으면 더 있음
        setDataLength(data.length); // 현재 데이터의 길이 저장
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages(); // 컴포넌트가 마운트될 때 API 호출
  }, [group.woomsId, currentPage, group.date]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0)); // 이전 페이지로 이동
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1); // 다음 페이지로 이동
    }
  };

  // 빈 div를 추가하여 항상 6개의 요소가 있도록 함
  const emptyDivs = Array.from(
    { length: itemsPerPage - dataLength },
    (_, index) => <div key={`empty-${index}`} className='w-[138px] h-[161px]' />
  );

  return (
    <Modal onClose={onClose}>
      <div className='flex justify-center mt-4'>
        <div className='grid grid-cols-3 gap-4 max-w-[600px]'>
          {images.map((image) => (
            <div key={image.id} className='cursor-pointer relative'>
              <img
                src={image.path}
                alt={`detail-${image.id}`}
                className='w-[138px] h-[161px] object-cover'
                onClick={() => onImageClick(image.id)}
              />
            </div>
          ))}
          {emptyDivs} {/* 빈 div 추가 */}
        </div>
      </div>
      <div className='absolute left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2'>
        <button
          className={`w-8 h-8 bg-left-bt bg-cover ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        />
        <button
          className={`w-8 h-8 bg-right-bt bg-cover ${!hasMore ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextPage}
          disabled={!hasMore}
        />
      </div>
    </Modal>
  );
  ``;
};

export default ItemModal;

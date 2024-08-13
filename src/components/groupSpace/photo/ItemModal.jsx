import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import { GroupPhotoApi } from '../../../apis/GroupSpaceApi'; // API 호출을 위한 경로

const ItemModal = ({ group, onImageClick, onClose }) => {
  const itemsPerPage = 6; // 한 페이지당 표시할 이미지 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [images, setImages] = useState([]); // 이미지를 저장할 상태
  const totalPages = Math.ceil(images.length / itemsPerPage); // 전체 페이지 수 계산

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // group.woomsId와 group.date를 사용하여 이미지를 받아오는 API 호출
        const response = await GroupPhotoApi.getPhoto(
          group.woomsId,
          currentPage,
          group.date
        ); // API 호출
        setImages(response.data); // 받아온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages(); // 컴포넌트가 마운트될 때 API 호출
  }, [group.woomsId, currentPage, group.date]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1); // 이전 페이지로 이동
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1); // 다음 페이지로 이동
    }
  };

  const currentImages = images.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  ); // 현재 페이지의 이미지들

  // 빈 div를 추가하여 항상 6개의 요소가 있도록 함
  const emptyDivs = Array.from(
    { length: itemsPerPage - currentImages.length },
    (_, index) => <div key={`empty-${index}`} className='w-[138px] h-[161px]' />
  );

  return (
    <Modal onClose={onClose}>
      <div className='flex justify-center mt-4'>
        <div className='grid grid-cols-3 gap-4'>
          {currentImages.map((photo) => (
            <div key={photo.id} className='cursor-pointer relative'>
              <img
                src={photo.path}
                alt={`detail-${photo.id}`}
                className='w-[138px] h-[161px] object-cover'
                onClick={() => onImageClick(photo.path)}
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
          className={`w-8 h-8 bg-right-bt bg-cover ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        />
      </div>
    </Modal>
  );
};

export default ItemModal;

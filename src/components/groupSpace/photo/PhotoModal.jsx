import React, { useState, useEffect } from 'react';
import ItemModal from './ItemModal';
import DetailModal from './DetailModal';
import UploadModal from './UploadModal';
import Modal from '../../common/Modal';
import { GroupPhotoApi } from '../../../apis/GroupSpaceApi';

function PhotoModal({ onClose }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [photos, setPhotos] = useState([]);
  const pathname = window.location.pathname;
  const woomsId = pathname.split('/')[2]; // 페이지 URL에서 woomsId 추출
  const itemsPerPage = 6;

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const data = await GroupPhotoApi.getPhotoMonth(woomsId, currentPage);
        console.log('API Response:', data);
        setPhotos(data);
        setHasMore(data.length === itemsPerPage); // 받아온 데이터의 길이가 itemsPerPage와 같으면 더 있음
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    getPhotos();
  }, [woomsId, currentPage]);

  const handleGroupClick = (photo) => {
    // photo.date와 woomsId를 함께 전달
    setSelectedGroup({ ...photo, woomsId });
    setSelectedImage(null);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  const handleImageClick = (imageId) => {
    setSelectedImage(imageId);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1); // 더 많은 데이터가 있을 때만 페이지 증가
    }
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadClose = () => {
    setIsUploadModalOpen(false);
  };

  // 사진이 없는 공간을 채우기 위한 빈 div 생성
  const emptyDivs = Array.from(
    { length: itemsPerPage - photos.length },
    (_, index) => <div key={`empty-${index}`} className='w-[138px] h-[161px]' />
  );

  return (
    <>
      <Modal onClose={onClose}>
        {selectedImage ? (
          <DetailModal imageId={selectedImage} onClose={handleImageClose} />
        ) : selectedGroup ? (
          <ItemModal
            group={selectedGroup} // photo와 woomsId를 포함한 객체 전달
            onImageClick={handleImageClick}
            onClose={handleBackToGroups}
          />
        ) : (
          <>
            <div
              className='absolute top-4 right-6 flex items-center p-2 rounded cursor-pointer'
              onClick={handleUploadClick}
              style={{ backgroundColor: '#aa7959' }}
            >
              <div className='w-6 h-6 bg-plus-bt bg-cover'></div>
              <span className='ml-2 text-sm'>사진 추가</span>
            </div>

            <div className='flex justify-center mt-4'>
              <div className='grid grid-cols-3 gap-4 max-w-[600px]'>
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => handleGroupClick(photo)}
                    className='cursor-pointer relative'
                  >
                    <img
                      src={photo.path}
                      alt={`Photo ${photo.id}`}
                      className='w-[138px] h-[161px] object-cover'
                    />
                    <div className='absolute bottom-1 w-full bg-white text-black text-center text-sm'>
                      {photo.date.slice(2, 4)}년 {photo.date.slice(5, 7)}월
                    </div>
                  </div>
                ))}
                {emptyDivs}
              </div>
            </div>
            <div>
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
            </div>
          </>
        )}
      </Modal>
      {isUploadModalOpen && <UploadModal onClose={handleUploadClose} />}
    </>
  );
}

export default PhotoModal;

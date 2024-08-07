import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemModal from './ItemModal';
import DetailModal from './DetailModal';
import UploadModal from './UploadModal';
import Modal from '../../common/Modal'

const imageGroups = [
  {
    date: 1,
    images: ['assets/image1.jpg', 'assets/image2.jpg', 'assets/image3.jpg'],
  },
  {
    date: 2,
    images: ['assets/image4.jpg', 'assets/image5.jpg', 'assets/image6.jpg'],
  },
  {
    date: 3,
    images: ['assets/image7.jpg', 'assets/image8.jpg', 'assets/image9.jpg'],
  },
  {
    date: 4,
    images: ['assets/image10.jpg', 'assets/image11.jpg', 'assets/image12.jpg'],
  },
  {
    date: 5,
    images: ['assets/image13.jpg', 'assets/image14.jpg', 'assets/image15.jpg'],
  },
  {
    date: 6,
    images: ['assets/image16.jpg', 'assets/image17.jpg', 'assets/image18.jpg'],
  },
  {
    date: 7,
    images: ['assets/image19.jpg', 'assets/image20.jpg', 'assets/image21.jpg'],
  },
  {
    date: 8,
    images: ['assets/image22.jpg', 'assets/image23.jpg', 'assets/image24.jpg'],
  },
];

function PhotoModal({ }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(imageGroups.length / itemsPerPage);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setSelectedImage(null);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadClose = () => {
    setIsUploadModalOpen(false);
  };

  const currentGroups = imageGroups.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const emptyDivs = Array.from({ length: itemsPerPage - currentGroups.length }, (_, index) => (
    <div key={`empty-${index}`} className="w-32 h-32" />
  ));

  return (
    <>
      <Modal>
        {selectedImage ? (
          <DetailModal src={selectedImage}/>
        ) : selectedGroup ? (
          <ItemModal
            group={selectedGroup}
            onImageClick={handleImageClick}
          />
        ) : (
          <>
            <div className="absolute top-4 right-6 flex items-center p-2 rounded cursor-pointer" 
              onClick={handleUploadClick}
              style={{ backgroundColor: '#aa7959' }}
            >
              <div className="w-6 h-6 bg-plus-bt bg-cover"></div>
              <span className="ml-2 text-sm">사진 추가</span>
            </div>

            <div className="flex justify-center mt-4">
              <div className="grid grid-cols-3 gap-4 max-w-[600px]">
                {currentGroups.map((group) => (
                  <div key={group.date} onClick={() => handleGroupClick(group)} className="cursor-pointer relative">
                    <img 
                      src={group.images[0]} 
                      alt={`Group ${group.date}`} 
                      className="w-[138px] h-[161px] object-cover"
                    />
                    <div className='absolute bottom-0 w-full bg-white text-black text-center text-sm'>
                      {group.date} 월
                    </div>
                  </div>
                ))}
                {emptyDivs}
              </div>
            </div>
            <div>
              <div className="absolute left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2">
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
            </div>
          </>
        )}
      </Modal>
      {isUploadModalOpen && <UploadModal/>} 
    </>
  );
}

export default PhotoModal;
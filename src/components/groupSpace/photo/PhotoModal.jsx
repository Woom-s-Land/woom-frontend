import React, { useState, useEffect } from 'react';
import ItemModal from './ItemModal';
import DetailModal from './DetailModal';
import UploadModal from './UploadModal';
import Modal from '../../common/Modal';
import { GroupPhotoApi } from '../../../apis/GroupSpaceApi';

function PhotoModal({}) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const itemsPerPage = 6;
  const [photos, setPhotos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const pathname = window.location.pathname;
  const woomsId = pathname.split('/')[2];

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const data = await GroupPhotoApi.getPhotoMonth(woomsId, page);
        console.log('API Response:', data);
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    getPhotos();
  }, [woomsId, page]);

  return (
    <div>
      <Modal></Modal>
    </div>
  );
}

//   const handleGroupClick = (group) => {
//     setSelectedGroup(group);
//     setSelectedImage(null);
//   };

//   const handleBackToGroups = () => {
//     setSelectedGroup(null);
//   };

//   const handleImageClick = (src) => {
//     setSelectedImage(src);
//   };

//   const handleImageClose = () => {
//     setSelectedImage(null);
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 0));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
//   };

//   const handleUploadClick = () => {
//     setIsUploadModalOpen(true);
//   };

//   const handleUploadClose = () => {
//     setIsUploadModalOpen(false);
//   };

//   const emptyDivs = Array.from(
//     { length: itemsPerPage - (photos.length % itemsPerPage) },
//     (_, index) => <div key={`empty-${index}`} className='w-32 h-32' />
//   );

//   return (
//     <>
//       <Modal onClose={onClose}>
//         {selectedImage ? (
//           <DetailModal src={selectedImage} onClose={handleImageClose} />
//         ) : selectedGroup ? (
//           <ItemModal
//             group={selectedGroup}
//             onImageClick={handleImageClick}
//             onClose={handleBackToGroups}
//           />
//         ) : (
//           <>
//             <div
//               className='absolute top-4 right-6 flex items-center p-2 rounded cursor-pointer'
//               onClick={handleUploadClick}
//               style={{ backgroundColor: '#aa7959' }}
//             >
//               <div className='w-6 h-6 bg-plus-bt bg-cover'></div>
//               <span className='ml-2 text-sm'>사진 추가</span>
//             </div>

//             <div className='flex justify-center mt-4'>
//               <div className='grid grid-cols-3 gap-4 max-w-[600px]'>
//                 {photos.map((photo) => (
//                   <div
//                     key={photo.id}
//                     onClick={() => handleGroupClick(photo)}
//                     className='cursor-pointer relative'
//                   >
//                     <img
//                       src={photo.path}
//                       alt={`Photo ${photo.id}`}
//                       className='w-[138px] h-[161px] object-cover'
//                     />
//                     <div className='absolute bottom-0 w-full bg-white text-black text-center text-sm'>
//                       {photo.flipped === 'FLIPPED' ? 'Flipped' : 'Unflipped'}
//                     </div>
//                   </div>
//                 ))}
//                 {emptyDivs}
//               </div>
//             </div>
//             <div>
//               <div className='absolute left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2'>
//                 <button
//                   className={`w-8 h-8 bg-left-bt bg-cover ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   onClick={handlePrevPage}
//                   disabled={currentPage === 0}
//                 />
//                 <button
//                   className={`w-8 h-8 bg-right-bt bg-cover ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   onClick={handleNextPage}
//                   disabled={currentPage >= totalPages - 1}
//                 />
//               </div>
//             </div>
//           </>
//         )}
//       </Modal>
//       {isUploadModalOpen && <UploadModal onClose={handleUploadClose} />}
//     </>
//   );
// }

export default PhotoModal;

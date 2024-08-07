import { useEffect } from 'react';
import data from './dummy';
import dotImages from './dotImages';
import emptyImg from '../../../assets/heatmap/empty.png';

const imgList = {
  0: [dotImages.dot1_1, dotImages.dot1_2, dotImages.dot1_3, dotImages.dot1_4],
  1: [dotImages.dot2_1, dotImages.dot2_2, dotImages.dot2_3, dotImages.dot2_4],
  2: [dotImages.dot3_1, dotImages.dot3_2, dotImages.dot3_3, dotImages.dot3_4],
};
const PhotoHeatMap = ({ onClose }) => {
  const groupColor = 1;

  const getImageSrc = (value) => {
    switch (true) {
      case value === 0:
        return dotImages.dot;
      case value >= 1 && value <= 2:
        return imgList[groupColor][0];
      case value >= 3 && value <= 5:
        return imgList[groupColor][1];
      case value >= 6 && value <= 10:
        return imgList[groupColor][2];
      default:
        return imgList[groupColor][3];
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const emptyImageSrc = emptyImg;

  return (
    <div
      onClick={handleOutsideClick}
      className='modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
    >
      <div className='bg-modal-vertical bg-cover p-5 bg-center w-[470px] h-[550px] relative flex flex-col items-center'>
        <button
          onClick={onClose}
          className='absolute top-8 left-8 w-6 h-6 bg-close-bt bg-cover'
        />
        <div className='absolute top-7 flex justify-center items-center'>
          <p className='text-3xl mt-1 text-base-color'>채 움</p>
          <div className='w-4' />
          <div className='bg-help-mark w-4 h-4 mt-1 bg-cover peer hover:bg-help-mark-hover hover:cursor-pointer'></div>
          <div className='absolute pt-7 top-[35px] ml-[75px] bg-cover z-10 w-[300px] h-[100px] invisible peer-hover:visible bg-help-bubble text-base-color '>
            여러분의 사진 기록으로
            <br />
            지도를 채워보세요!
          </div>
        </div>

        <div className='w-full flex justify-center mt-8'>
          <div className='w-[350px] h-[450px] mt-5 bg-heatmap-bg bg-center bg-cover flex justify-center items-center'>
            <div className='grid grid-cols-custom-19 gap-0.5 mr-4 mt-4'>
              {data.map((row, rowIndex) =>
                row.map((cell, cellIndex) => (
                  <img
                    key={`${rowIndex}-${cellIndex}`}
                    src={cell === -1 ? emptyImageSrc : getImageSrc(cell)}
                    className='w-4 h-4'
                    alt={`cell-${rowIndex}-${cellIndex}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoHeatMap;

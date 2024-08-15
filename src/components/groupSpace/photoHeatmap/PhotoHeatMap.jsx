import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dotImages from './dotImages';
import basemap from './basemap';
import data from './dummy';
import refresh from '../../../assets/heatmap/refresh.png';
import emptyImg from '../../../assets/heatmap/empty.png';
import PhotoApi from '../../../apis/PhotoApi';
import GroupApi from '../../../apis/GroupApi';

const imgList = {
  RED: [dotImages.dot1_1, dotImages.dot1_2, dotImages.dot1_3, dotImages.dot1_4],
  GREEN: [
    dotImages.dot2_1,
    dotImages.dot2_2,
    dotImages.dot2_3,
    dotImages.dot2_4,
  ],
  BLUE: [
    dotImages.dot3_1,
    dotImages.dot3_2,
    dotImages.dot3_3,
    dotImages.dot3_4,
  ],
};

const PhotoHeatMap = ({ onClose, woomsId }) => {
  const [photoData, setPhotoData] = useState();
  const [groupColor, setGroupColor] = useState('RED');
  const [error, setError] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const colors = ['RED', 'GREEN', 'BLUE'];

  const isAdminFunc = async () => {
    try {
      const data = await GroupApi.isAdmin(woomsId);
      setIsAdmin(data.woomsAdmin);
    } catch (err) {
      console.error('Failed to check admin status:', err);
      setError('Failed to check admin status.');
    }
  };

  const getColor = async () => {
    try {
      const data = await GroupApi.getGroupInfo(woomsId);
      setGroupColor(data.woomsDto.mapColorStatus);
    } catch (err) {
      setError('fail get group color');
    }
  };
  const [heatmap, setHeatmap] = useState();

  const generateHeatmap = (basemap, apiData) => {
    const apiDataMap = apiData.reduce((acc, { id, count }) => {
      acc[id] = count;
      return acc;
    }, {});

    return basemap.map((row) =>
      row.map((cell) =>
        cell === -1 ? -1 : apiDataMap[cell] !== undefined ? apiDataMap[cell] : 0
      )
    );
  };

  const getMap = async () => {
    if (!woomsId) return;
    try {
      const data = await PhotoApi.getMapInfo(woomsId);

      setHeatmap(generateHeatmap(basemap, data));
    } catch (err) {
      setError('fail get photo info');
    }
  };

  useEffect(() => {
    getColor();
    isAdminFunc();
    getMap();
  }, [woomsId]);

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

  const handleClose = () => {
    saveColorToServer(groupColor); // 색상 서버에 저장
    onClose(); // 모달 닫기
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      handleClose();
    }
  };

  const handleColorClick = async () => {
    const currentIndex = colors.indexOf(groupColor);

    const nextIndex = (currentIndex + 1) % colors.length;
    const nextColor = colors[nextIndex];

    setGroupColor(nextColor); // 상태 업데이트
  };

  const saveColorToServer = async (color) => {
    try {
      await GroupApi.changeGroupColor(woomsId, color);
    } catch (err) {
      setError('fail to change color');
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
      <motion.div
        initial={{ scale: 0.01 }}
        animate={{ scale: [1.0, 0.8, 1.0] }}
        exit={{ scale: 0.01 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='bg-modal-vertical bg-cover p-5 bg-center w-[520px] h-[600px] relative flex flex-col items-center'
      >
        <button
          onClick={handleClose}
          className='absolute top-8 left-8 w-6 h-6 bg-close-bt bg-cover'
        />
        {isAdmin && (
          <button
            onClick={handleColorClick}
            className='absolute bottom-11 right-[80px] bg-contain bg-hm-refresh z-10 w-5 h-5 bg-no-repeat'
          />
        )}
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
          <div className='w-[420px] h-[520px] mt-5 bg-heatmap-bg bg-center bg-cover flex justify-center items-center'>
            <div className='grid grid-cols-custom-19 gap-0.5 ml-6 mt-40'>
              {heatmap &&
                heatmap.map((row, rowIndex) =>
                  row.map((cell, cellIndex) => (
                    <img
                      key={`${rowIndex}-${cellIndex}`}
                      src={cell === -1 ? emptyImageSrc : getImageSrc(cell)}
                      className='w-[10px] h-[10px]'
                      alt={`cell-${rowIndex}-${cellIndex}`}
                    />
                  ))
                )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PhotoHeatMap;

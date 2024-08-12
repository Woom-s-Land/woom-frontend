import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import baseUrl from '../../../libs/axios/basicAxios';

import letter from '../../../assets/letter/letter.png';
import happyEmoji from '../../../assets/common/happyEmoji.png';

const letterVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

const LetterDetail = ({ letterId, onBack }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [detailInfo, setDetailInfo] = useState(null);

  useEffect(() => {
    const getLetterDetail = async () => {
      try {
        const response = await baseUrl.get(`/letters/${letterId}/detail`);

        setDetailInfo(response.data);
        console.log('편지 상세 정보 저장 성공', response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getLetterDetail();
  }, [letterId]);

  if (!detailInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className='letter fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <motion.div
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={letterVariants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className='relative w-2/6 flex flex-col items-center'
      >
        <img src={letter} alt='letter' className='w-full' />
        <div className='absolute top-0 w-full h-full flex flex-col items-center'>
          <div className='absolute top-6 left-[34px]'>
            <span className='text-xl font-bold'>{userInfo.nickname}</span>
            <span className='text-xl font-bold'>에게</span>
          </div>
          <textarea
            value={detailInfo.content}
            className='absolute top-14 w-11/12 h-2/3 p-4 rounded resize-none bg-transparent overflow-hidden focus:outline-none leading-relaxed font-semibold'
            maxLength={350}
            disabled={true}
          />
          <div className='absolute bottom-36 right-2 p-4 flex flex-col items-end'>
            <p className='text-lg font-bold'>
              {new Date(detailInfo.sentDate).toLocaleDateString()}
            </p>
            <p className='text-lg font-bold'>{detailInfo.senderName} 올림</p>
          </div>
          <motion.div
            className='flex text-lg py-2 px-4 bg-transparent rounded mb-0 absolute bottom-14 right-2 font-bold hover:underline decoration-wavy text-yellow-600'
            variants={buttonVariants}
            whileHover='hover'
            whileTap='tap'
          >
            <img src={happyEmoji} alt='happyEmoji' className='mr-1 w-6' />
            <button whileHover={{ scale: 1.05 }} onClick={onBack}>
              편지 목록 보기
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LetterDetail;

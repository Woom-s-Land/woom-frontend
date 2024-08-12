import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import baseUrl from '../../../libs/axios/basicAxios';

import letter from '../../../assets/letter/letter.png';

const LetterDetail = ({ letterId, onClose }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const receiverName = userInfo.nickname;
  const [detailInfo, setDetailInfo] = useState({
    id: 3,
    content: '안녕하세요 도언이 user2입니다.',
    senderName: '안녕',
    sentDate: '2024-08-02T00:22:19.633467',
  });
  const { content, sentDate, senderName } = detailInfo;

  // useEffect(() => {
  //   const getLetterDetail = async () => {
  //     try {
  //       const response = await baseUrl.get(`/letters/${letterId}/detail`);

  //       console.log(response.data);
  //       setDetailInfo(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getLetterDetail();
  // }, [letterId]);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
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
            <span className='text-xl'>{receiverName}</span>
            <span className='text-xl'>에게</span>
          </div>
          <textarea
            value={content}
            className='absolute top-14 w-11/12 h-2/3 p-4 rounded resize-none bg-transparent overflow-hidden focus:outline-none leading-relaxed'
            maxLength={350}
            disabled={true}
          />
          <div className='absolute bottom-36 right-2 p-4 flex flex-col items-end'>
            <p className='text-lg'>{new Date(sentDate).toLocaleDateString()}</p>
            <p className='text-lg'>
              {senderName ? senderName : '안녕안녕안녕안'} 올림
            </p>
          </div>
          <motion.button
            initial={{ scale: 0.01 }}
            animate={{ scale: [1.0, 0.8, 1.0] }}
            exit={{ scale: 0.01 }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
              type: 'spring',
              stiffness: 300,
            }}
            whileHover={{ scale: 1.05 }}
            onClick={onClose}
            className='py-2 px-4 bg-transparent rounded mb-0 absolute bottom-3 right-2'
          >
            편지 목록 보기
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LetterDetail;

import { useState, useEffect } from 'react';
import baseUrl from '../../../libs/axios/basicAxios';

import Modal from '../../common/Modal';
import Button from '../../common/Button';
import leftBtn from '../../../assets/button/left-bt-up.png';
import rightBtn from '../../../assets/button/right-bt-up.png';

// 날짜 형식을 변환하는 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const LetterList = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // 편지 목록의 총 페이지 수 / page 최댓값: totalPages - 1
  const [letters, setLetters] = useState([
    {
      id: 3,
      content: '안녕하세요 도언이 user4입니다.',
      receiveDate: '2024-08-02T00:22:19.633482',
      senderName: 'User Four',
      receiverName: 'User One',
      status: 'UNREAD',
    },
    {
      id: 2,
      content: '안녕하세요 도언이 user3입니다.',
      receiveDate: '2024-08-12T00:22:19.633478',
      senderName: 'User Three',
      receiverName: 'User One',
      status: 'UNREAD',
    },
    {
      id: 1,
      content: '안녕하세요 도언이 user2입니다.',
      receiveDate: '2024-08-02T00:22:19.633467',
      senderName: 'User Two',
      receiverName: 'User One',
      status: 'READ',
    },
    {
      id: 1,
      content: '안녕하세요 도언이 user2입니다.',
      receiveDate: '2024-08-02T00:22:19.633467',
      senderName: 'User Two',
      receiverName: 'User One',
      status: 'READ',
    },
    {
      id: 1,
      content: '안녕하세요 도언이 user2입니다.',
      receiveDate: '2024-08-02T00:22:19.633467',
      senderName: 'User Two',
      receiverName: 'User One',
      status: 'READ',
    },
  ]);
  const [comingLetters, setComingLetters] = useState(null);
  // const [selectedLetter, setSelectedLetter] = useState(null);

  // useEffect(() => {
  //   const getLetters = async () => {
  //     try {
  //       const response = await baseUrl.get('/letters', {
  //         params: {
  //           page,
  //         },
  //       });
  //       console.log('편지 목록 저장 성공', response.data);
  //       setTotalPages(response.data.totalPages);
  //       setLetters(response.data.content);
  //     } catch (error) {
  //       console.log('편지 목록 저장 실패');
  //       console.error(error);
  //     }
  //   };

  //   const getComingLetters = async () => {
  //     try {
  //       const response = await baseUrl.get('/letters/amount');

  //       console.log('오고 있는 편지 저장 성공', response.data);
  //       setComingLetters(response.data);
  //     } catch (error) {
  //       console.log('오고 있는 편지 저장 실패');
  //       console.error(error);
  //     }
  //   };

  //   getLetters();
  //   getComingLetters();

  //   return () => {
  //     setLetters([]);
  //     setComingLetters(null);
  //   };
  // }, [page]);

  const handleLeft = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleRight = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const deleteLetter = async (letterId) => {
    try {
      const response = await baseUrl.delete(`/letters/${letterId}`);

      console.log('편지 삭제 성공', response);
      setLetters(letters.filter((letter) => letter.id !== letterId));
    } catch (error) {
      console.error('편지 삭제 실패');
    }
  };

  return (
    <Modal>
      <div className='flex justify-center items-center mb-16'>
        <h1 className='absolute text-3xl top-9'>받은 편지함</h1>
        <span className='absolute top-[36px] right-60 text-3xl'>1</span>
        {/* <img src={emptyHeart} alt="" /> */}
        {/* <img src={fullHeart} alt='' /> */}
      </div>
      <button
        onClick={handleLeft}
        className='absolute left-4 top-1/2 transform -translate-y-1/2'
        disabled={page === 0 ? true : false}
      >
        <img src={leftBtn} alt='leftBtn' className='w-7' />
      </button>
      <button
        onClick={handleRight}
        className='absolute right-4 top-1/2 transform -translate-y-1/2'
        disabled={page === totalPages - 1 ? true : false}
      >
        <img src={rightBtn} alt='rightBtn' className='w-7' />
      </button>
      <div>
        {letters.map((letter) => (
          <div key={letter.id} className='flex mb-6'>
            <div
              className={`text-4xl basis-2/5 ${letter.status === 'READ' ? 'text-gray-500' : ''}`}
            >
              {letter.senderName}
            </div>
            <div
              className={`text-4xl basis-2/5 ${letter.status === 'READ' ? 'text-gray-500' : ''}`}
            >
              {formatDate(letter.receiveDate)}
            </div>
            <div className='basis-1/5'>
              <button onClick={() => deleteLetter(letter.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default LetterList;

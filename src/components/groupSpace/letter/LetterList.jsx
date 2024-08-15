import { useState, useEffect } from 'react';
import { alertActions } from '../../../store/alertSlice';
import { useDispatch } from 'react-redux';

import baseUrl from '../../../libs/axios/basicAxios';
import Modal from '../../common/Modal';
import miniSquareBtn from '../../../assets/common/miniSquareBtn.png';
import leftBtn from '../../../assets/button/left-bt-up.png';
import rightBtn from '../../../assets/button/right-bt-up.png';
import emptyHeart from '../../../assets/common/emptyHeart.png';
import fullHeart from '../../../assets/common/fullHeart.png';
import speechBubble from '../../../assets/common/speechBubble.png';

// 날짜 형식을 변환하는 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

const LetterList = ({ onClose, onLetterClick }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // 편지 목록의 총 페이지 수 / page 최댓값: totalPages - 1
  const [letters, setLetters] = useState([]);
  const [comingLetters, setComingLetters] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const getLetters = async () => {
      try {
        const response = await baseUrl.get('/letters', {
          params: {
            page,
          },
        });
        console.log('편지 목록 저장 성공', response.data);
        setTotalPages(response.data.totalPages);
        setLetters(response.data.content);
      } catch (error) {
        console.log('편지 목록 저장 실패');
        console.error(error);
        dispatch(
          alertActions.showAlert({
            message: error.response.data.message,
            type: 'ERROR',
          })
        );
      }
    };

    const getComingLetters = async () => {
      try {
        const response = await baseUrl.get('/letters/amount');

        console.log('오고 있는 편지 저장 성공', response.data);
        setComingLetters(response.data);
      } catch (error) {
        console.log(error, '오고 있는 편지 저장 실패');
        dispatch(
          alertActions.showAlert({
            message: error.response.data.message,
            type: 'ERROR',
          })
        );
      }
    };

    const getUnreadCount = async () => {
      try {
        const response = await baseUrl.get('/letters/total');
        console.log('읽지 않은 편지 개수 저장 성공', response.data);
        setUnreadCount(response.data.totalUnreadCount);
      } catch (error) {
        console.log('읽지 않은 편지 개수 저장 실패', error);
        dispatch(
          alertActions.showAlert({
            message: error.response.data.message,
            type: 'ERROR',
          })
        );
      }
    };

    getLetters();
    getComingLetters();
    getUnreadCount();

    return () => {
      setLetters([]);
      setComingLetters(null);
      setUnreadCount(0);
    };
  }, [page]);

  const handleLeft = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleRight = () => {
    if (page < totalPages - 1) {
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

  const openLetterDetail = (letterId) => {
    onLetterClick(letterId);
    console.log(letterId);
  };

  return (
    <Modal onClose={onClose}>
      <div className='flex justify-center items-center mb-16'>
        <h1 className='absolute text-3xl top-9'>받은 편지함</h1>
        <span className='absolute top-[37px] right-40 text-3xl'>
          {unreadCount}
        </span>
        {!comingLetters ? (
          <img
            src={emptyHeart}
            alt='emptyHeart'
            className='absolute w-8 top-9 right-[62px]'
          />
        ) : (
          <div className='group'>
            <img
              src={fullHeart}
              alt='fullHeart'
              className='absolute w-8 top-9 right-[62px] cursor-pointer'
            />
            <img
              src={speechBubble}
              alt='speechBubble'
              className='absolute hidden group-hover:block right-0 -top-16'
            />
            <span className='absolute hidden group-hover:block right-5 -top-4'>
              편지 오는 중...
            </span>
          </div>
        )}
      </div>
      <button
        onClick={handleLeft}
        className='absolute left-3 top-1/2 transform -translate-y-1/2'
        disabled={page === 0}
      >
        <img src={leftBtn} alt='leftBtn' className='w-6' />
      </button>
      <button
        onClick={handleRight}
        className='absolute right-3 top-1/2 transform -translate-y-1/2 '
        disabled={page === totalPages - 1}
      >
        <img src={rightBtn} alt='rightBtn' className='w-6' />
      </button>
      <div className='ml-10'>
        {letters.map((letter) => (
          <div key={letter.id} className='flex mb-6 items-center'>
            <div
              className={`cursor-pointer text-3xl basis-2/5 ${letter.status === 'READ' ? 'text-stone-500' : ''}`}
              onClick={() => openLetterDetail(letter.id)}
            >
              {letter.senderName}
            </div>
            <div
              className={`text-3xl basis-2/5 ${letter.status === 'READ' ? 'text-stone-500' : ''}`}
            >
              {formatDate(letter.receiveDate)}
            </div>
            <div className='basis-1/6 flex items-center justify-center'>
              <button
                className='relative flex items-center justify-center'
                onClick={() => deleteLetter(letter.id)}
              >
                <img src={miniSquareBtn} alt='miniSquareBtn' className='w-11' />
                <span className='absolute text-xs'>삭제</span>{' '}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default LetterList;

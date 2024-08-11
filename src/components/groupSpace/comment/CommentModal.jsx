import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import { GroupCommentApi } from '../../../apis/GroupSpaceApi';

const Comment = ({ onClose }) => {
  const pathname = window.location.pathname;
  const woomsId = pathname.split('/')[2];
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(0);
  const [today, setToday] = useState('');

  // 댓글을 가져오는 함수
  const getComments = async () => {
    try {
      const data = await GroupCommentApi.getComment(woomsId, page);
      setComments(data); // 한 페이지의 댓글만 설정
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // 오늘의 댓글을 가져오는 함수
  const getCommentsToday = async () => {
    try {
      const data = await GroupCommentApi.getCommentToday(woomsId);
      // 데이터가 { 'result': 'okay' } 형태일 때 'result' 값을 추출하여 설정
      if (data && data.result) {
        setToday(data.result);
      } else {
        setToday('No result found');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setToday('Error fetching data');
    }
  };

  // 컴포넌트가 처음 로드될 때 및 페이지 변경 시 댓글을 가져옴
  useEffect(() => {
    getComments();
  }, [woomsId, page]);

  useEffect(() => {
    getCommentsToday();
  }, [woomsId]);

  // 댓글 작성 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    try {
      await GroupCommentApi.postComment(woomsId, inputValue);
      setInputValue('');
      getComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className='px-4'>
        <h2 className='text-2xl mt-4 mb-4 text-base-color'>방명록</h2>
        <form onSubmit={handleSubmit} className='items-center'>
          <div className='relative ml-32 mb-5 bg-inputbox-comment bg-center bg-no-repeat bg-contain h-[50px] w-[470px] flex items-center justify-between'>
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='댓글을 입력하세요'
              className='w-[350px] h-[30px] ml-9 text-sm placeholder-white outline-none'
              style={{
                fontSize: '12px',
                border: 'none',
                background: 'transparent',
              }}
            />
            <Button label='작성' type='submit' className='h-[30px] text-sm' />
          </div>
        </form>

        <ul className='list-none'>
          {comments.map((comment, index) => (
            <li
              key={index}
              className='flex items-center mb-1'
              style={{ height: '70px' }}
            >
              <div className='flex justify-center items-center basis-1/5'>
                <div className='flex flex-col items-center'>
                  <img
                    src={`/src/assets/profile/profile-${comment.costume}.png`}
                    alt='프로필 이미지'
                    className='w-9 h-9 rounded-full'
                  />
                  <span className='text-xs mt-1'>{comment.nickname}</span>
                </div>
              </div>
              <div className='absolute ml-32 bg-dialoguebox-comment bg-center bg-no-repeat bg-contain rounded overflow-hidden mr-10 w-[470px] h-[50px]'>
                <div className='relative flex flex-col ml-1 pl-3'>
                  <div className='text-xs text-left ml-5 mt-4'>
                    {comment.content}
                  </div>
                  <span className='text-xs text-right mr-3'>
                    {new Date(comment.createdDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className='absolute left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2'>
          <button
            className={`w-8 h-8 bg-left-bt bg-cover ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          />
          <button
            className={`w-8 h-8 bg-right-bt bg-cover ${comments.length < 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setPage(page + 1)}
            disabled={comments.length < 4}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Comment;

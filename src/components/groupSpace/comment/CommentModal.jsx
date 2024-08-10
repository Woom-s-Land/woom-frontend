import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../../libs/axios/basicAxios';
import Modal from '../../common/Modal';
import Button from '../../common/Button';

const Comment = ({ onClose }) => {
  const pathname = window.location.pathname;
  const woomsId = pathname.split('/')[2];

  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [costume, setCostume] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/comments/wooms/${woomsId}`,
          {
            params: { page },
          }
        );
        setComments(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [woomsId, page]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      const newComment = {
        content: inputValue,
      };

      try {
        const response = await axios.post(
          `${baseUrl}/comments/wooms/${woomsId}`,
          newComment
        );
        setComments([response.data, ...comments]);
        setInputValue('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className='px-4'>
        <h2 className='text-2xl mt-4 mb-4 text-base-color'>방명록</h2>
        <form onSubmit={handleSubmit} className='items-center'>
          <div
            className='relative ml-32 mb-5 flex items-center justify-between bg-inputbox-comment'
            style={{
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              height: '50px',
              width: '470px',
            }}
          >
            <input
              type='text'
              value={inputValue}
              onChange={handleInputChange}
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
                    src={`src/assets/profile/profile-${comment.costume}.png`}
                    alt='프로필 이미지'
                    className='w-9 h-9 rounded-full'
                  />
                  <span className='text-xs mt-1'>{comment.nickname}</span>
                </div>
              </div>
              <div
                className='absolute ml-32 bg-center bg-no-repeat rounded overflow-hidden mr-10 bg-dialoguebox-comment'
                style={{
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  width: '470px',
                  height: '50px',
                }}
              >
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
            onClick={handlePreviousPage}
            disabled={page === 0}
          />
          <button
            className={`w-8 h-8 bg-right-bt bg-cover ${page >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Comment;

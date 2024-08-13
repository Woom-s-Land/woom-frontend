import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import axios from 'axios';

const BASE_URL = 'https://i11e206.p.ssafy.io';
const api = axios.create({
  baseURL: BASE_URL,
});

function StoryReadModal({ onClose, woomsId }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [stories, setStories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const storiesPerPage = 4;

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/wooms/${woomsId}/stories`, {
          params: { page: currentPage, size: storiesPerPage },
        });
        setStories(response.data.stories);
        setTotalPages(response.data.totalPage); // Assuming response.data.total provides the total number of stories
      } catch (error) {
        setError(error.response?.data?.message || '사연 목록 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [currentPage, woomsId]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePlay = (url) => {
    new Audio(url).play();
  };

  return (
    <Modal onClose={onClose}>
      <div className='absolute inset-x-0 top-7 text-3xl mt-1 text-base-color'>
        사연 읽기
      </div>
      <div className='absolute inset-x-5 top-20'>
        <div className='flex flex-wrap justify-center gap-5'>
          {stories.length > 0 ? (
            stories.map((story, index) => (
              <div
                key={index}
                className='bg-white bg-opacity-20 rounded-lg w-[350px] h-[70px] flex items-center p-4'
              >
                <div className='flex justify-between items-center w-full'>
                  <div className='pl-5 text-lg text-white'>
                    {story.userNickname}
                  </div>
                  <Button
                    label='재생'
                    onClick={() => handlePlay(story.filename)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className='w-full h-[70px] flex justify-center items-center bg-transparent'></div>
          )}
        </div>
      </div>
      <div className='absolute left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2'>
        <button
          className={`absolute left-1 w-8 h-8 bg-left-bt bg-cover ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        />
        <button
          className={`absolute right-1 w-8 h-8 bg-right-bt bg-cover ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        />
      </div>
    </Modal>
  );
}

export default StoryReadModal;

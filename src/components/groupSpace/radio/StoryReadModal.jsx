import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import { GroupStoryApi } from '../../../apis/GroupSpaceApi';

const StoryReadModal = ({ onClose, woomsId }) => {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 초기값을 0으로 설정
  const [fetchedTotalPages, setFetchedTotalPages] = useState(0); // API에서 받아온 totalPages를 저장하는 상태
  const [currentAudio, setCurrentAudio] = useState(null); // 현재 재생 중인 오디오를 관리

  useEffect(() => {
    const getStories = async () => {
      try {
        const response = await GroupStoryApi.getStory(woomsId, currentPage);
        console.log('API Response:', response);
        const { stories, totalPage } = response;
        console.log(totalPage);
        setStories(stories);
        setFetchedTotalPages(totalPage); // 상태로 관리
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    getStories();
  }, [woomsId, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < fetchedTotalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePlay = (url) => {
    // 현재 재생 중인 오디오가 있으면 중지
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }

    // 새로운 오디오를 생성하고 재생
    const newAudio = new Audio(url);
    newAudio.play();

    // 현재 재생 중인 오디오로 설정
    setCurrentAudio(newAudio);
  };

  return (
    <Modal onClose={onClose}>
      <div className='absolute inset-x-0 top-7 text-3xl mt-1 text-base-color'>
        사연 읽기
      </div>
      <div className='absolute inset-x-5 top-20'>
        <div className='flex flex-wrap justify-center gap-5'>
          {stories.length > 0 ? (
            stories.map((story) => (
              <div
                key={story.id}
                className='bg-white bg-opacity-20 rounded-lg w-[350px] h-[70px] flex items-center p-4'
              >
                <div className='flex justify-between items-center w-full'>
                  <div className='pl-5 text-lg text-white'>
                    {story.userNickname}
                  </div>
                  <Button
                    label='재생'
                    onClick={() => handlePlay(story.fileName)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className='w-full h-[70px] flex justify-center items-center bg-transparent'>
              사연이 없습니다.
            </div>
          )}
        </div>
      </div>
      <div className='absolute left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2'>
        <button
          className={`w-8 h-8 bg-left-bt bg-cover ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        />
        <button
          className={`w-8 h-8 bg-right-bt bg-cover ${currentPage >= fetchedTotalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextPage}
          disabled={currentPage >= fetchedTotalPages - 1}
        />
      </div>
    </Modal>
  );
};

export default StoryReadModal;

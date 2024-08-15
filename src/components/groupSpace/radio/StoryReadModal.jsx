import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import Loading from '../../common/Loading'; // Loading 컴포넌트를 임포트합니다.
import { GroupStoryApi } from '../../../apis/GroupSpaceApi';
import { alertActions } from '../../../store/alertSlice';

const StoryReadModal = ({ onClose, woomsId }) => {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetchedTotalPages, setFetchedTotalPages] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(null); // 현재 재생 중인 오디오를 관리
  const [playingStoryId, setPlayingStoryId] = useState(null); // 현재 재생 중인 스토리 ID
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 state를 추가합니다.

  useEffect(() => {
    const getStories = async () => {
      try {
        setIsLoading(true); // API 호출 전에 로딩 상태를 true로 설정합니다.
        const response = await GroupStoryApi.getStory(woomsId, currentPage);
        const { stories, totalPage } = response;
        setStories(stories);
        setFetchedTotalPages(totalPage);
      } catch (error) {
        alertActions.showAlert({
          message: '사연을 읽을 수 없습니다. 다시 시도해주세요.',
          type: 'ERROR',
        });
      } finally {
        setIsLoading(false); // API 호출이 끝난 후 로딩 상태를 false로 설정합니다.
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

  const handlePlay = (url, storyId) => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setPlayingStoryId(null);
    }

    const newAudio = new Audio(url);
    newAudio.play();
    setCurrentAudio(newAudio);
    setPlayingStoryId(storyId);
  };

  const handlePause = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setPlayingStoryId(null);
    }
  };

  // 모달이 닫힐 때 현재 재생 중인 오디오를 중지
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
        setPlayingStoryId(null);
      }
    };
  }, [currentAudio]);

  return (
    <Modal
      onClose={() => {
        onClose();
        // 모달 닫기 시 오디오 중지
        if (currentAudio) {
          currentAudio.pause();
          setCurrentAudio(null);
          setPlayingStoryId(null);
        }
      }}
    >
      <div className='absolute inset-x-0 top-7 text-3xl mt-1 text-point-color'>
        사연 듣기
      </div>
      <div className='absolute inset-x-5 top-20'>
        {isLoading ? ( // 로딩 상태일 때 Loading 컴포넌트를 표시합니다.
          <Loading />
        ) : (
          <div className='flex flex-wrap justify-center gap-5'>
            {stories.length > 0 ? (
              stories.map((story) => (
                <div
                  key={story.id}
                  className='bg-white bg-opacity-20 rounded-lg w-[350px] h-[70px] flex items-center p-4'
                >
                  <div className='flex items-center space-x-4 w-full'>
                    <img
                      src={`/src/assets/${story.costume}/h1.png`}
                      alt='Costume'
                      className='w-12 h-12 rounded-full'
                    />
                    <div className='flex justify-between items-center w-full'>
                      <div className='pl-5 text-lg text-white'>
                        {story.userNickname}
                      </div>
                      <Button
                        label={
                          playingStoryId === story.id ? '일시정지' : '재생'
                        }
                        onClick={() => {
                          if (playingStoryId === story.id) {
                            handlePause();
                          } else {
                            handlePlay(story.fileName, story.id);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='w-full h-[70px] flex justify-center items-center bg-transparent'>
                사연이 없습니다.
              </div>
            )}
          </div>
        )}
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

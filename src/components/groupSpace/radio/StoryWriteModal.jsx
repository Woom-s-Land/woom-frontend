import React, { useState } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import { useSelector } from 'react-redux';
import { GroupStoryApi } from '../../../apis/GroupSpaceApi';

const StoryWriteModal = ({ onClose, woomsId }) => {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redux에서 사용자 정보를 가져옵니다.
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userNickname = userInfo.nickname || ''; // 사용자 닉네임을 가져옵니다

  const maxLength = 200;
  const minLength = 20; // 최소 20자
  const maxLength2 = 199; // 1자를 덜 입력할 수 있도록 설정

  const handleChangeStory = (e) => {
    setStory(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await GroupStoryApi.postStory(
        woomsId,
        userNickname,
        story // story는 content에 해당
      );
      console.log(data);
      // 성공 처리 로직 추가
    } catch (error) {
      console.error('사연 작성 실패:', error);
      // 실패 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  };

  const isStoryValid = story.length >= minLength;

  return (
    <Modal onClose={isLoading ? null : onClose}>
      <div className='absolute inset-x-0 top-7 text-3xl mt-1 text-base-color'>
        사연 작성
      </div>
      <div className='absolute inset-x-5 top-20 flex justify-center items-center'>
        <div className='relative w-[440px] h-[280px] bg-inputbox-story bg-center bg-cover'>
          <textarea
            value={story}
            onChange={handleChangeStory}
            placeholder={`여기에 사연을 작성해 주세요. (최소 ${minLength}자)`}
            maxLength={maxLength2}
            className='resize-none absolute inset-0 w-full h-full pt-5 pr-8 pl-8 rounded-md bg-transparent text-white outline-none'
            disabled={isLoading}
          />
          <div className='absolute bottom-1 right-4 text-white text-sm'>
            {story.length}/{maxLength}
          </div>
        </div>
      </div>
      {!isStoryValid && (
        <div className='text-red-500 text-sm text-center mt-2'>
          최소 {minLength}자 이상 입력하세요.
        </div>
      )}
      <div className='absolute inset-x-0 bottom-4 flex justify-center items-center space-x-2'>
        <Button
          label={isLoading ? '제출 중...' : '사연 보내기'}
          onClick={handleSubmit}
          disabled={isLoading || !woomsId || !userNickname || !isStoryValid}
        />
      </div>
    </Modal>
  );
};

export default StoryWriteModal;

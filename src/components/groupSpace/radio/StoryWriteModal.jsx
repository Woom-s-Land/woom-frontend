import React, { useState } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import { useSelector, useDispatch } from 'react-redux';
import { GroupStoryApi } from '../../../apis/GroupSpaceApi';
import { alertActions } from '../../../store/alertSlice';

const StoryWriteModal = ({ onClose, woomsId }) => {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const userNickname = userInfo.nickname || '';

  const maxLength = 200;
  const minLength = 20;

  const handleChangeStory = (e) => {
    setStory(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (story.length < minLength) {
      dispatch(
        alertActions.showAlert({
          message: `사연은 최소 ${minLength}자 이상이어야 합니다.`,
          type: 'ERROR',
        })
      );
      return;
    }

    setIsLoading(true);

    try {
      const data = await GroupStoryApi.postStory(woomsId, userNickname, story);
      console.log(data);

      dispatch(
        alertActions.showAlert({
          message: '사연이 성공적으로 작성되었습니다.',
          type: 'SUCCESS',
        })
      );

      // 추가적인 성공 처리 로직 (모달 닫기 등)
      setTimeout(() => {
        setIsLoading(false);
        onClose(); // 모달 닫기
      }, 2000); // 2초 후 모달 닫기
    } catch (error) {
      dispatch(
        alertActions.showAlert({
          message: error.response?.data?.message || '사연 작성에 실패했습니다.',
          type: 'ERROR',
        })
      );
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className='absolute inset-x-0 top-7 text-3xl mt-1 text-base-color'>
        사연 작성
      </div>
      <div className='absolute inset-x-5 top-20 flex justify-center items-center'>
        <div className='relative w-[440px] h-[280px] bg-inputbox-story bg-center bg-cover'>
          <textarea
            value={story}
            onChange={handleChangeStory}
            placeholder={`여기에 사연을 작성해 주세요. (최소 ${minLength}자)`}
            maxLength={maxLength}
            className='resize-none absolute inset-0 w-full h-full pt-5 pr-8 pl-8 rounded-md bg-transparent text-white outline-none'
            disabled={isLoading}
          />
          <div className='absolute bottom-1 right-4 text-white text-sm'>
            {story.length}/{maxLength}
          </div>
        </div>
      </div>
      <div className='text-red-500 text-sm text-center mt-2'>
        {story.length < minLength && `최소 ${minLength}자 이상 입력하세요.`}
      </div>
      <div className='absolute inset-x-0 bottom-4 flex justify-center items-center space-x-2'>
        <Button
          label={isLoading ? '제출 중...' : '사연 보내기'}
          onClick={handleSubmit}
          disabled={isLoading || !woomsId || !userNickname}
        />
      </div>
    </Modal>
  );
};

export default StoryWriteModal;

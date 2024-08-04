import React, { useState } from "react";
import Modal from '../../common/Modal';
import Button from '../../common/Button';

function StoryWriteModal() {
  const [story, setStory] = useState('');
  const maxLength = 200;

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setStory(e.target.value);
    }
  };

  return (
    <>
      <Modal>
        <div className="absolute inset-x-0 top-7 text-3xl mt-1 text-base-color">사연 작성</div>
        <div className="absolute inset-x-5 top-20 flex justify-center items-center">
          <div className="relative w-[440px] h-[280px] bg-inputbox-story bg-center bg-cover">
            <textarea
              value={story}
              onChange={handleChange}
              placeholder="여기에 사연을 작성해 주세요"
              maxLength={maxLength}
              className="absolute inset-0 w-full h-full pt-5 pr-8 pl-8 rounded-md bg-transparent text-white outline-none"
            />
            <div className="absolute bottom-1 right-4 text-white text-sm">
              {story.length}/{maxLength}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-1 flex justify-center items-center">
          <Button label='사연 제출하기' />
        </div>
      </Modal>
    </>
  );
}

export default StoryWriteModal;

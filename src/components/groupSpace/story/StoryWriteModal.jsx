import React, { useState, useEffect } from "react";
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import axios from 'axios';

const BASE_URL = 'https://i11e206.p.ssafy.io';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
});

function StoryWriteModal() {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [woomsId, setWoomsId] = useState(null);
  const maxLength = 200;

  useEffect(() => {
    const fetchWoomsId = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/wooms/id`);
        const data = await response.json();
        setWoomsId(data.woomsId);
      } catch (error) {
        console.error('Failed to fetch woomsId:', error);
      }
    };

    fetchWoomsId();
  }, []);

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setStory(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (!woomsId) {
      console.error('woomsId is not set');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post(`/api/wooms/${woomsId}/stories`, {
        content: story,
      });
      
      if (response.status === 200) {
        console.log('사연 작성 성공:', response.data);
        // 성공 했을 때 우째 할지 추가 해볼게요
      }
    } catch (error) {
      console.error('사연 작성 실패:', error);
      // 실패 했을 때 우째 할지 추가 해볼게요
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
            />
            <div className="absolute bottom-1 right-4 text-white text-sm">
              {story.length}/{maxLength}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-1 flex justify-center items-center">
          <Button label={isLoading ? '제출 중...' : '사연 제출하기'} onClick={handleSubmit} disabled={isLoading || !woomsId} />
          {isLoading && <div className="loader">로딩 중...</div>}
        </div>
      </Modal>
    </>
  );
}

export default StoryWriteModal;

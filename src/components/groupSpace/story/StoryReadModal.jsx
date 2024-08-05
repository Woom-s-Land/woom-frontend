import React, { useState, useEffect } from "react";
import Modal from "../../common/Modal";
import Button from "../../common/Button";
import axios from 'axios';

const BASE_URL = 'https://i11e206.p.ssafy.io';
const api = axios.create({
  baseURL: BASE_URL,
});

function StoryReadModal() {
  const [currentPage, setCurrentPage] = useState(0);
  const [stories, setStories] = useState([]);
  const storiesPerPage = 4;

  // 더미 데이터
  const dummyStories = [
    { nickname: 'Alice', filename: 'https://example.com/audio1.mp3' },
    { nickname: 'Bob', filename: 'https://example.com/audio2.mp3' },
    { nickname: 'Charlie', filename: 'https://example.com/audio3.mp3' },
    { nickname: 'David', filename: 'https://example.com/audio4.mp3' },
    { nickname: 'Eve', filename: 'https://example.com/audio5.mp3' },
    { nickname: 'Frank', filename: 'https://example.com/audio6.mp3' },
    { nickname: 'Grace', filename: 'https://example.com/audio7.mp3' },
    // { nickname: 'Hannah', filename: 'https://example.com/audio8.mp3' },
  ];

  // API 호출을 위한 useEffect
  // useEffect(() => {
  //   const fetchStories = async () => {
  //     try {
  //       const response = await api.get(`/api/wooms/your-wooms-id/stories`, {
  //         params: { page: currentPage, size: storiesPerPage }
  //       });
  //       setStories(response.data);
  //     } catch (error) {
  //       console.error('사연 목록 불러오기 실패:', error);
  //     }
  //   };
  //
  //   fetchStories();
  // }, [currentPage]);

  useEffect(() => {
    // 페이지에 맞는 더미 데이터 슬라이스
    const startIndex = currentPage * storiesPerPage;
    const endIndex = startIndex + storiesPerPage;
    setStories(dummyStories.slice(startIndex, endIndex));
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(dummyStories.length / storiesPerPage) - 1));
  };

  const handlePlay = (url) => {
    new Audio(url).play();
  };

  return (
    <Modal>
      <div className="absolute inset-x-0 top-7 text-3xl mt-1 text-base-color">사연 읽기</div>
      <div className="absolute inset-x-5 top-20">
        <div className="flex flex-wrap justify-center gap-5">
          {stories.length > 0 ? (
            stories.map((story, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-lg w-[350px] h-[70px] flex items-center p-4">
                <div className="flex justify-between items-center w-full">
                  <div className="pl-5 text-lg text-white">{story.nickname}</div>
                  <Button label='재생' onClick={() => handlePlay(story.filename)} />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-[70px] flex justify-center items-center bg-transparent"></div>
          )}
        </div>
      </div>
      <div className="absolute left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2">
        <button
          className={`absolute left-1 w-8 h-8 bg-left-bt bg-cover ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        />
        <button
          className={`absolute right-1 w-8 h-8 bg-right-bt bg-cover ${currentPage >= Math.ceil(dummyStories.length / storiesPerPage) - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(dummyStories.length / storiesPerPage) - 1}
        />
      </div>         
    </Modal>  
  );
}

export default StoryReadModal;

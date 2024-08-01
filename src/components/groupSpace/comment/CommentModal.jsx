import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from '../../common/Modal';

const baseUrl = 'http://i11e206.p.ssafy.io';

function CommentModal({ woomsId, onClose }) {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // API 요청을 통해 댓글 데이터를 가져옴
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/wooms/${woomsId}`); // API 엔드포인트를 설정
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [woomsId]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      const newComment = {
        nickname: "사용자 이름", // 사용자 이름을 여기에 추가
        content: inputValue,
        costume: 0, // 코스튬을 설정할 경우 필요
        createdDate: new Date().toISOString(),
      };

      try {
        const response = await axios.post(`${baseUrl}/api/comments/${woomsId}`, newComment); // API 엔드포인트를 설정
        setComments([response.data, ...comments]);
        setInputValue(""); // 입력 필드 초기화
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <h2>방명록</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="댓글을 입력하세요"
          />
          <button type="submit">작성</button>
        </form>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.nickname}</strong> <span>{comment.createdDate}</span>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default CommentModal;

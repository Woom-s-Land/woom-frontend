import { useState } from 'react';
import axios from 'axios';

import Modal from '../../common/Modal';

const baseUrl = 'https://i11e206.p.ssafy.io';

const WriteLetter = ({
  onClose,
  onChange,
  userNickname,
  sendDateTime,
  onNext,
}) => {
  const [content, setContent] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
    onChange(e.target.value);
  };

  return (
    <Modal onClose={onClose}>
      <h1>Write Letter</h1>
      <h2>{userNickname}에게</h2>
      <textarea value={content} onChange={handleContentChange} />
      <h2>보낸 날짜: {sendDateTime}</h2>
      <button onClick={onNext}>도착 날짜 고르기</button>
    </Modal>
  );
};

export default WriteLetter;

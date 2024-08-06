import React from 'react';

const LetterDetail = ({ letter, onBack }) => {
  return (
    <div>
      <h2>편지 상세 페이지</h2>
      <button onClick={onBack}>뒤로 가기</button>
      <p>보낸 사람: {letter.senderName}</p>
      <p>받는 사람: {letter.receiverName}</p>
      <p>내용: {letter.content}</p>
      <p>받은 날짜: {new Date(letter.receiveDate).toLocaleString()}</p>
      <p>상태: {letter.status}</p>
    </div>
  );
};

export default LetterDetail;

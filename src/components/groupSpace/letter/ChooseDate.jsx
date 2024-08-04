import { useState } from 'react';

import Modal from '../../common/Modal';
import Button from '../../common/Button';

const ChooseDate = ({ onClose, onChange, onSubmit, sendDateTime }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    const dateOption = e.target.value;
    let date = new Date(sendDateTime);

    switch (dateOption) {
      case '1':
        date.setDate(date.getDate() + 1);
        break;
      case '3':
        date.setDate(date.getDate() + 3);
        break;
      case '7':
        date.setDate(date.getDate() + 7);
        break;
      default:
        date = null;
        break;
    }

    const formattedDate = date ? date.toISOString() : '';
    setSelectedDate(formattedDate);
    onChange(formattedDate); // formattedDate를 직접 전달
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <h1>언제 전달해줄까?</h1>
        sendDateTime: {sendDateTime}
        <select onChange={handleDateChange}>
          <option value=''>날짜 선택</option>
          <option value='1'>내일</option>
          <option value='3'>3일 후</option>
          <option value='7'>7일 후</option>
        </select>
        {selectedDate && (
          <p>선택한 날짜: {new Date(selectedDate).toLocaleString()}</p>
        )}
        <button onClick={onSubmit}>편지 보내기</button>
      </div>
    </Modal>
  );
};

export default ChooseDate;

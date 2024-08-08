import { useState } from 'react';
import ModalClose from '../../common/ModalClose';
import Button from '../../common/Button';
import DropDown from '../../common/DropDown';

const ChooseDate = ({ onClose, onChange, onSubmit, sendDateTime }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (option) => {
    const dateOption = option.value;
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
    onChange(formattedDate);
  };

  const dateOptions = [
    { label: '내일', value: '1' },
    { label: '사흘 후', value: '3' },
    { label: '일주일 후', value: '7' },
  ];

  const formatSelectedDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <ModalClose onClose={onClose}>
      <section className='flex flex-col h-5/6 justify-between text-center'>
        <h1 className='text-4xl text-center mt-4'>편지를 언제 전달해줄까요?</h1>
        <div className='flex justify-center items-center mx-4'>
          <div className='w-1/3 flex justify-center'>
            <DropDown
              options={dateOptions}
              placeholder='날짜 선택'
              onSelect={handleDateChange}
            />
          </div>
        </div>
        <div className='relative w-full flex justify-center'>
          {selectedDate && (
            <p className='absolute text-center text-2xl'>
              편지가 {formatSelectedDate(selectedDate)}에 도착해요!
            </p>
          )}
        </div>
        <div className='flex justify-center mt-8'>
          <Button
            label={'편지 보내기'}
            onClick={onSubmit}
            disabled={!selectedDate}
          />
        </div>
      </section>
    </ModalClose>
  );
};

export default ChooseDate;

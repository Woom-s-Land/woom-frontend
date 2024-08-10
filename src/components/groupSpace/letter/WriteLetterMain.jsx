import { useState, useEffect } from 'react';
import baseUrl from '../../../libs/axios/basicAxios';

import ChooseUser from './ChooseUser';
import WriteLetter from './WriteLetter';
import ChooseDate from './ChooseDate';

const WriteLetterMain = ({ isOpen = true, onClose }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [content, setContent] = useState('');
  const [sendDateTime, setSendDateTime] = useState('');

  const [isUserModalOpen, setUserModalOpen] = useState(true);
  const [isLetterModalOpen, setLetterModalOpen] = useState(false);
  const [isDateModalOpen, setDateModalOpen] = useState(false);

  useEffect(() => {
    setSendDateTime(new Date().toISOString());
    console.log(isUserModalOpen, isLetterModalOpen, isDateModalOpen);
  }, []);

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleSelectedUser = (userInfo) => {
    setSelectedUser(userInfo);
  };

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const openWriteLetter = () => {
    setUserModalOpen(false);
    setLetterModalOpen(true);
  };

  const openDate = () => {
    setLetterModalOpen(false);
    setDateModalOpen(true);
  };

  const sendLetter = async () => {
    try {
      const response = await baseUrl.post(
        '/letters',
        {
          targetUserUuid: selectedUser.uuid,
          content: content,
          receiveDateTime: selectedDate,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isOpen && (
        <>
          {isUserModalOpen && (
            <ChooseUser
              onClose={onClose}
              onChange={handleSelectedUser}
              onNext={openWriteLetter}
            />
          )}
          {isLetterModalOpen && (
            <WriteLetter
              onClose={onClose}
              onChange={handleContentChange}
              userNickname={selectedUser.nickname}
              sendDateTime={sendDateTime}
              onNext={openDate}
            />
          )}
          {isDateModalOpen && (
            <ChooseDate
              onClose={onClose}
              sendDateTime={sendDateTime}
              onChange={handleSelectedDate}
              onSubmit={sendLetter}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WriteLetterMain;

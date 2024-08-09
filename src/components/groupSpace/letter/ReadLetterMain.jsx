import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LetterList from './LetterList';
import LetterDetail from './LetterDetail';

const baseUrl = 'https://i11e206.p.ssafy.io';

const ReadLetterMain = ({ isOpen, onClose }) => {
  const [letters, setLetters] = useState([
    {
      id: 3,
      content: '안녕하세요 도언이 user4입니다.',
      receiveDate: '2024-08-02T00:22:19.633482',
      senderName: 'User Four',
      receiverName: 'User One',
      status: 'UNREAD',
      sentDate: '2024-04-02T00:22:19.633482',
    },
    {
      id: 2,
      content: '안녕하세요 도언이 user3입니다.',
      receiveDate: '2024-08-02T00:22:19.633478',
      senderName: 'User Three',
      receiverName: 'User One',
      status: 'UNREAD',
      sentDate: '2024-03-02T00:22:19.633482',
    },
    {
      id: 1,
      content: '안녕하세요 도언이 user2입니다.',
      receiveDate: '2024-08-02T00:22:19.633467',
      senderName: 'User Two',
      receiverName: 'User One',
      status: 'READ',
      sentDate: '2024-02-02T00:22:19.633482',
    },
  ]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/letters`);
        setLetters(response.data.content);
      } catch (error) {
        console.error('Error fetching letters:', error);
      }
    };

    fetchLetters();
  }, []);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  return (
    <div>
      {isOpen && (
        <>
          <h1>편지 관리</h1>
          {!selectedLetter ? (
            <LetterList
              onClose={onClose}
              letters={letters}
              onLetterClick={handleLetterClick}
            />
          ) : (
            <LetterDetail
              letter={selectedLetter}
              onBack={() => setSelectedLetter(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ReadLetterMain;

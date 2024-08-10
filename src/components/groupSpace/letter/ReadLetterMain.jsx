import { useState, useEffect } from 'react';
import baseUrl from '../../../libs/axios/basicAxios';
import LetterList from './LetterList';
import LetterDetail from './LetterDetail';

const ReadLetterMain = ({ isOpen, onClose }) => {
  const [selectedLetterId, setSelectedLetterId] = useState(null);

  const handleLetterClick = (letter) => {
    setSelectedLetterId(letter);
  };

  const handleBack = () => {
    setSelectedLetterId(null);
  };

  return (
    <div>
      {isOpen && (
        <>
          {!selectedLetterId ? (
            <LetterList onClose={onClose} onLetterClick={handleLetterClick} />
          ) : (
            <LetterDetail letterId={selectedLetterId} onBack={handleBack} />
          )}
        </>
      )}
    </div>
  );
};

export default ReadLetterMain;

import React, { useState } from 'react';
import Modal from '../../common/Modal';

function DetailModal({ src }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <Modal>
        <div className="flex justify-center items-center h-full">
          <div
            className={`relative w-64 h-64 bg-white shadow-lg perspective-1000`} // Removed the class here
            onClick={handleClick}
          >
            <div
              className={`absolute w-full h-full transition-transform duration-600 ${isFlipped ? 'rotate-y-180' : ''}`}
            >
              <div className={`absolute w-full h-full backface-hidden ${isFlipped ? 'hidden' : ''}`}>
                <img src={src} alt="Front" className="w-full h-full object-contain" />
              </div>
              <div className={`absolute w-full h-full bg-blue-500 text-white flex items-center justify-center text-2xl rotate-y-180 ${isFlipped ? 'block' : 'hidden'}`}>
                여기가 뒷면이다
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;

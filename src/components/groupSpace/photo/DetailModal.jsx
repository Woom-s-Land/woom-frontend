import React, { useState } from 'react';
import Modal from '../../common/Modal';

function DetailModal({ src, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <Modal onClose={onClose}>
        <div className='flex justify-center items-center'>
          <div
            className={`w-[300px] h-[350px] shadow-lg perspective-1000`} // Removed the class here
            onClick={handleClick}
          >
            <div
              className={`absolute w-[300px] h-[350px] transition-transform duration-600 ${isFlipped ? 'rotate-y-180' : ''}`}
            >
              <div
                className={`absolute w-[300px] h-[350px] backface-hidden ${isFlipped ? 'hidden' : ''}`}
              >
                <img
                  src={src}
                  alt='Front'
                  className='w-[300px] h-[350px] object-contain'
                />
              </div>
              <div
                className={`absolute w-[300px] h-[350px] bg-base-color text-white flex items-center justify-center text-2xl rotate-y-180 ${isFlipped ? 'block' : 'hidden'}`}
              >
                정훈이 뒤집었다 이말이다
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DetailModal;

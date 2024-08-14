import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function Modal({ children, onClose }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className='modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center z-10 items-center'
      onClick={handleOutsideClick}
    >
      <motion.div
        initial={{ scale: 0.01 }}
        animate={{ scale: [1.0, 0.8, 1.0] }}
        exit={{ scale: 0.01 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='bg-modal-bg bg-cover bg-center p-0 rounded-lg w-[700px] h-[447px] relative flex flex-col justify-center'
      >
        <button
          className='absolute top-5 left-7 w-6 h-6 bg-close-bt bg-cover'
          onClick={onClose} // 닫기 버튼 클릭 시 이전 페이지로 이동
        />
        {children}
      </motion.div>
    </div>
  );
}

export default Modal;

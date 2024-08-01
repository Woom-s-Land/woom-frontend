import React from 'react';

function Modal({ children, onClose }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center m-0 p-0'>
      <div className='bg-modal-bg bg-cover bg-center p-5 rounded-lg w-[700px] h-[447px] relative flex flex-col justify-center m-0'>
        <button
          className='absolute top-3 left-5 w-6 h-6 bg-close-bt bg-cover'
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;

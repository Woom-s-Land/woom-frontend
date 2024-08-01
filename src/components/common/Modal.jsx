import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Modal({ children }) {  
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      goBack();
    }
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      goBack();
    }
  };
  
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-modal-bg bg-cover bg-center p-0 rounded-lg w-[700px] h-[447px] relative flex flex-col justify-center">
        <button 
          className="absolute top-3 left-5 w-6 h-6 bg-close-bt bg-cover" 
          onClick={goBack} // 닫기 버튼 클릭 시 이전 페이지로 이동
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;

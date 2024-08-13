import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Button({ label, onClick, disabled = false }) {
  const [isActive, setIsActive] = useState(false);

  // 버튼의 너비를 계산하기 위해 label의 길이에 따라 기본 너비를 설정합니다.
  const calculateWidth = (text) => {
    const baseWidth = 50; // 기본 너비
    const extraWidthPerChar = 10; // 문자당 추가 너비
    return baseWidth + text.length * extraWidthPerChar;
  };

  const buttonWidth = calculateWidth(label);

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);
  const handleMouseLeave = () => setIsActive(false); // 버튼에서 마우스가 떠날 때도 비활성화 상태로 변경

  return (
    <motion.button
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 300,
      }}
      whileHover={{ scale: 1.05 }}
      className='relative flex items-center justify-center rounded cursor-pointer overflow-hidden'
      style={{ width: `${buttonWidth}px`, height: '60px' }} // 버튼의 너비와 높이를 설정합니다.
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={`w-full h-full bg-cover bg-center ${isActive ? 'bg-down-bt' : 'bg-up-bt'}`}
        style={{ backgroundSize: '100% 100%' }} // 이미지가 버튼에 맞게 조정되도록 설정
      />
      <span
        className='absolute text-sm font-bold text-white'
        style={{
          top: '50%', // 버튼의 중앙으로 위치 조정
          left: '50%',
          transform: 'translate(-50%, -50%)', // 정확히 중앙에 위치시키기 위한 변환
          whiteSpace: 'nowrap', // 문구가 잘리지 않도록 설정
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}

export default Button;

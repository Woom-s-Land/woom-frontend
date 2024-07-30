import React, { useState } from 'react';

function Button({ label, onClick }) {
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

  return (
    <button
      className="relative flex items-center justify-center rounded cursor-pointer overflow-hidden"
      style={{ width: `${buttonWidth}px`, height: '80px' }} // 버튼의 너비와 높이를 설정합니다.
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onClick}
    >
      <img 
        src={isActive ? 'src/assets/common/square-bt-down.png' : 'src/assets/common/square-bt-up.png'} 
        alt={label}
        style={{ 
          width: '100%',  // 버튼의 가로 길이에 맞게 늘림
          height: '50px', // 버튼의 높이에 맞게 조정 (고정된 높이)
          objectFit: 'fill', // 이미지의 비율을 무시하고 버튼 영역에 맞게 늘림
          objectPosition: 'center'
        }} 
      />
      <span 
        className="absolute text-sm font-bold text-white"
        style={{ 
          top: '50%', // 버튼의 중앙으로 위치 조정
          left: '50%',
          transform: 'translate(-50%, -60%)', // 정확히 중앙에 위치시키기 위한 변환
          whiteSpace: 'nowrap' // 문구가 잘리지 않도록 설정
        }} 
      >
        {label}
      </span>
    </button>
  );
}

export default Button;

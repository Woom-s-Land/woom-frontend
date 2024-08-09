import React from 'react';

const ColorButton = ({ color, onClick }) => {
  const [r, g, b] = color;
  const backgroundColor = `rgb(${r}, ${g}, ${b})`;

  return (
    <button
      className='w-10 h-10 rounded-full m-0.5 border-0 cursor-pointer'
      style={{ backgroundColor }}
      onClick={() => onClick(color)}
    ></button>
  );
};

export default ColorButton;

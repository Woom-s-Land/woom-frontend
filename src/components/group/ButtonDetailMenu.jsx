import { useEffect, useState } from 'react';
const ButtonDetailMenu = ({ buttonText, isClicked, handleClick }) => {
  const [icon, setIcon] = useState('bg-gr-btn');
  useEffect(() => {
    if (isClicked) setIcon('bg-gr-btn-active');
    else setIcon('bg-gr-btn');
  }, [isClicked]);
  return (
    <button
      onClick={handleClick}
      className={`${icon} w-1/6 bg-cover h-8 z-20 left-5 top-5 flex items-center justify-center bg-no-repeat`}
    >
      {buttonText}
    </button>
  );
};

export default ButtonDetailMenu;

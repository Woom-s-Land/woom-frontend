import { useState } from 'react';
import normal_box from '../../assets/common/normal_box.png';
import drop_down from '../../assets/common/drop_down_btn.png';

const DropDown = ({ options = [], placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className='relative inline-block w-full text-center'>
      <div
        className='flex items-center cursor-pointer w-full justify-center'
        onClick={handleSelectClick}
      >
        <div className='relative w-full text-lg'>
          <img src={normal_box} alt='normal_box' className='w-full' />
          <p className='absolute inset-0 flex justify-center items-center text-black'>
            {selectedOption}
          </p>
        </div>
      </div>
      {isOpen && (
        <div className='absolute z-10 w-full scrollbar rounded-md h-48 overflow-scroll'>
          {options.map((option, index) => (
            <div
              key={index}
              className='relative flex items-center cursor-pointer w-full text-lg justify-center'
              onClick={() => handleOptionClick(option)}
            >
              <img src={normal_box} alt='normal_box' className='w-full' />
              <p className='absolute inset-0 flex justify-center items-center text-black'>
                {option.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;

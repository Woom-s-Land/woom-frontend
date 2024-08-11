import { useState } from 'react';
import normal_box from '../../assets/common/normal_box.png';
import { motion, AnimatePresence } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

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
      <motion.div
        whileHover={{ scale: 1.05 }}
        className='flex items-center cursor-pointer w-full justify-center'
        onClick={handleSelectClick}
      >
        <div className='relative w-full text-lg'>
          <img src={normal_box} alt='normal_box' className='w-full' />
          <p className='absolute inset-0 flex justify-center items-center text-black'>
            {selectedOption}
          </p>
        </div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1, // 각 자식 요소의 애니메이션을 순차적으로 실행
                },
              },
            }}
            key='select-box'
            className='absolute z-10 w-full scrollbar rounded-md h-48 overflow-scroll'
          >
            {options.map((option, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
                exit='exit'
                key={index}
                className='relative flex items-center cursor-pointer w-full text-lg justify-center'
                onClick={() => handleOptionClick(option)}
              >
                <img src={normal_box} alt='normal_box' className='w-full' />
                <p className='absolute inset-0 flex justify-center items-center text-black'>
                  {option.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;

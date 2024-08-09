import React, { useState, useEffect } from 'react';
import Modal from '../../../common/Modal';
import Button from '../../../common/Button';
import ColorButton from './ColorButton';
import paletteData from '../../../../assets/photo/palette.json'; // JSON 파일의 경로를 설정하세요

const ColorPaletteEditor = ({ onClose, onUpdatePalette }) => {
  const [palettes, setPalettes] = useState([]);
  const [currentPalette, setCurrentPalette] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setPalettes(paletteData);
    if (paletteData.length > 0) {
      setCurrentPalette(paletteData[0]);
    }
  }, []);

  const handlePaletteSelect = (index) => {
    setCurrentPalette(palettes[index]);
    setIsDropdownOpen(false);
  };

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const paletteChunks = chunkArray(currentPalette, 8);

  return (
    <Modal onClose={onClose}>
      <div className='flex flex-col items-center p-4'>
        <div className='relative mb-4'>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='py-2 px-4 bg-teal-500 text-white rounded'
          >
            {`팔레트 선택`}
          </button>

          {isDropdownOpen && (
            <div className='absolute top-full mt-2 w-full bg-white border border-gray-300 shadow-lg z-10'>
              {palettes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePaletteSelect(index)}
                  className='block py-2 px-4 hover:bg-gray-200 w-full text-left'
                >
                  팔레트 {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className='flex flex-col gap-2 mb-4'>
          {paletteChunks.map((chunk, rowIndex) => (
            <div key={rowIndex} className='flex flex-wrap gap-2'>
              {chunk.map((color, colorIndex) => (
                <ColorButton key={colorIndex} color={color} />
              ))}
            </div>
          ))}
        </div>

        <Button
          label='확인'
          onClick={() => {
            onUpdatePalette(currentPalette);
            onClose();
          }}
        />
      </div>
    </Modal>
  );
};

export default ColorPaletteEditor;

import React, { useState, useRef, useCallback, useEffect } from 'react';
import pixelit from '../../../libs/pixelit';
import html2canvas from 'html2canvas';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // cropImage 유틸리티 함수
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import ColorPaletteEditor from './custom/ColorPaletteEditor';
import { GroupPhotoApi } from '../../../apis/GroupSpaceApi';

const UploadModal = ({ onClose }) => {
  const pathname = window.location.pathname;
  const woomsId = pathname.split('/')[2];
  const [files, setFiles] = useState([]);
  const [pixelCanvas, setPixelCanvas] = useState(null);
  const [pixelScale, setPixelScale] = useState(13);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [isCropped, setIsCropped] = useState(false);
  const [palette, setPalette] = useState([
    [46, 34, 47],
    [62, 53, 70],
    [98, 85, 101],
    [150, 108, 108],
    [171, 148, 122],
    [255, 255, 255],
  ]);
  const [showPaletteEditor, setShowPaletteEditor] = useState(false);
  const [showPixelCanvas, setShowPixelCanvas] = useState(true);
  const [showButtons, setShowButtons] = useState(true);

  const canvasRef = useRef(null);
  const polaroidRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(droppedFiles[0]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(selectedFiles[0]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('업로드할 파일이 없습니다.');
      return;
    }

    setLoading(true);

    try {
      const canvas = await html2canvas(polaroidRef.current);
      const dataURL = canvas.toDataURL('image/png');

      // Data URL을 Blob으로 변환
      const blob = await fetch(dataURL).then((res) => res.blob());
      const file = new File([blob], 'captured_image.png', {
        type: 'image/png',
      });

      // 서버로 업로드
      const mapId = 1; // 실제 mapId로 변경하세요
      const response = await GroupPhotoApi.postPhoto(woomsId, mapId, file);
      console.log('업로드 성공:', response);

      alert('업로드가 성공적으로 완료되었습니다!');
      setFiles([]);
      setCaption('');
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleTransform = async (scale) => {
    if (croppedArea && imageSrc) {
      setLoading(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedArea);
      if (scale === 26) {
        setPixelCanvas(croppedImage);
      } else {
        const canvas = canvasRef.current;
        const img = new Image();
        img.src = croppedImage;
        img.onload = () => {
          const px = new pixelit({
            to: canvas,
            scale: scale || pixelScale,
            palette: palette,
          });
          px.setFromImgSource(img.src).draw().pixelate().convertPalette();
          setPixelCanvas(canvas.toDataURL());
        };
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isCropped) {
      handleTransform(pixelScale);
    }
  }, [pixelScale, isCropped, palette]);

  const handleCrop = async () => {
    if (croppedArea && imageSrc) {
      setIsCropped(true);
    }
  };

  const handleDownload = () => {
    html2canvas(polaroidRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'polaroid_image.png';
      link.click();
    });
  };

  const handleNewTransform = () => {
    setPixelCanvas(null);
    setIsCropped(false);
    setPixelScale(13);
  };

  const handlePaletteEdit = () => {
    setShowPixelCanvas(false); // 사진 숨기기
    setShowButtons(false);
    setShowPaletteEditor(true);
  };

  const handlePaletteUpdate = (newPalette) => {
    setPalette(newPalette);
    setShowPixelCanvas(true); // 사진 다시 표시하기
    setShowButtons(true);
  };

  return (
    <Modal onClose={onClose}>
      {showPaletteEditor && (
        <ColorPaletteEditor
          onClose={() => {
            setShowPaletteEditor(false);
            setShowPixelCanvas(true); // 사진 다시 표시하기
            setShowButtons(true);
          }}
          onUpdatePalette={handlePaletteUpdate}
        />
      )}
      {!pixelCanvas && !loading ? (
        imageSrc ? (
          <div>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
            />
            <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2'>
              <Button
                label='자르기'
                onClick={handleCrop} // Corrected here
              />
            </div>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className='w-[300px] h-[200px] border-2 border-dashed p-4 mb-4 text-center mx-auto'
            style={{ borderColor: '#aa7959' }}
          >
            <p style={{ color: '#aa7959' }}>
              여기 파일을 드래그 앤 드롭하세요!
            </p>
            <label className='cursor-pointer flex flex-col items-center justify-center'>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                multiple
                className='hidden'
              />
              <img
                src='../src/assets/button/file-bt.png'
                alt='asd'
                className='h-[150px]'
              />
            </label>
          </div>
        )
      ) : (
        showPixelCanvas && (
          <div
            className='flex flex-col items-center space-x-4 mb-4'
            style={{ marginTop: '15px' }}
          >
            <div
              ref={polaroidRef}
              className='bg-white p-4 shadow-lg w-[240px] h-[280px] flex flex-col items-center relative'
            >
              {loading ? (
                <p className='text-red-500 absolute inset-0 flex justify-center items-center'>
                  변환 중...
                </p>
              ) : (
                pixelCanvas && (
                  <img
                    src={pixelCanvas}
                    alt='Pixelated'
                    className='w-[200px] h-[200px] object-cover'
                  />
                )
              )}
              <input
                type='text'
                value={caption}
                onChange={(e) => setCaption(e.target.value.slice(0, 11))} // Limit to 10 characters
                placeholder='캡션 작성 (최대 11자)'
                className='mt-2 p-2 rounded w-full text-center absolute bottom-4 focus:outline-none'
              />
            </div>
          </div>
        )
      )}
      <canvas id='pixelitcanvas' ref={canvasRef} className='hidden'></canvas>
      {isCropped && (
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full max-w-xs'>
            <label
              htmlFor='pixel-range'
              className='block mb-2 text-sm font-medium text-white'
            >
              픽셀화 정도: {pixelScale}
            </label>
            <input
              id='pixel-range'
              type='range'
              min='2'
              max='26' // Range 수정
              value={pixelScale}
              onChange={(e) => setPixelScale(parseInt(e.target.value))}
              className='w-full h-2 bg-base-color rounded-lg appearance-none cursor-pointer'
            />
          </div>
        </div>
      )}
      <div
        className='flex justify-end space-x-2'
        style={{ marginRight: '20px' }}
      >
        {showButtons && pixelCanvas && !loading && (
          <>
            <Button label='팔레트 편집' onClick={handlePaletteEdit} />
            <Button label='다시 자르기' onClick={handleNewTransform} />
            <Button label='다운로드' onClick={handleDownload} />
            <Button label='업로드' onClick={handleUpload} />
          </>
        )}
      </div>
    </Modal>
  );
};

export default UploadModal;

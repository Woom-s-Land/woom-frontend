import React, { useState, useRef, useCallback, useEffect } from 'react';
import pixelit from '../../../libs/pixelit';
import html2canvas from 'html2canvas';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // cropImage 유틸리티 함수
import Modal from '../../common/Modal'
import Button from '../../common/Button'

function UploadModal({ }) {
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

  const handleUpload = () => {
    if (files.length > 0) {
      alert(`${files.length}개의 사진이 업로드되었습니다!`);
      setFiles([]);
    } else {
      alert('업로드할 파일이 없습니다.');
    }
    onClose();
  };

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleTransform = async (scale) => {
    if (croppedArea && imageSrc) {
      setLoading(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedArea);
      const canvas = canvasRef.current;
      const img = new Image();
      img.src = croppedImage;
      img.onload = () => {
        const px = new pixelit({
          to: canvas,
          scale: scale || pixelScale,
          palette: [ // 사용자 정의 팔레트 설정 (RGB 값)
            [46, 34, 47],
            [62, 53, 70],
            [98, 85, 101],
            [150, 108, 108],
            [171, 148, 122],
            [105, 79, 98],
            [127, 112, 138],
            [155, 171, 178],
            [199, 220, 208],
            [255, 255, 255],
            [110, 39, 39],
            [179, 56, 49],
            [234, 79, 54],
            [245, 125, 74],
            [174, 35, 52],
            [232, 59, 59],
            [251, 107, 29],
            [247, 150, 23],
            [249, 194, 43],
            [122, 48, 69],
            [158, 69, 57],
            [205, 104, 61],
            [230, 144, 78],
            [251, 185, 84],
            [76, 62, 36],
            [103, 102, 51],
            [162, 169, 71],
            [213, 224, 75],
            [251, 255, 134],
            [22, 90, 76],
            [35, 144, 99],
            [30, 188, 115],
            [145, 219, 105],
            [205, 223, 108],
            [49, 54, 56],
            [55, 78, 74],
            [84, 126, 100],
            [146, 169, 132],
            [178, 186, 144],
            [11, 94, 101],
            [11, 138, 143],
            [14, 175, 155],
            [48, 225, 185],
            [143, 248, 226],
            [50, 51, 83],
            [72, 74, 119],
            [77, 101, 180],
            [77, 155, 230],
            [143, 211, 255],
            [69, 41, 63],
            [107, 62, 117],
            [144, 94, 169],
            [168, 132, 243],
            [234, 173, 237],
            [117, 60, 84],
            [162, 75, 111],
            [207, 101, 127],
            [237, 128, 153],
            [131, 28, 93],
            [195, 36, 84],
            [240, 79, 120],
            [246, 129, 129],
            [252, 167, 144],
            [253, 203, 176]
          ]
        });
        px.setFromImgSource(img.src).draw().pixelate().convertPalette();
        setPixelCanvas(canvas.toDataURL());
        setLoading(false);
      };
    }
  };

  useEffect(() => {
    if (isCropped) {
      handleTransform(pixelScale);
    }
  }, [pixelScale, isCropped]);

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

  return (
    <Modal>
      {!pixelCanvas && !loading ? (
        imageSrc ? (
          <div className="relative w-full h-64">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
            />
            <button 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleCrop}
            >
              자르기
            </button>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-[300px] h-[200px] border-2 border-dashed p-4 mb-4 text-center mx-auto"
            style={{ borderColor: '#aa7959' }}
          >
            <p style={{ color: '#aa7959' }}>여기에 파일을 드래그 앤 드롭하세요!</p>
            <label className="cursor-pointer">
              <img 
                src="src/assets/button/file-bt.png" 
                alt="파일 선택 아이콘"
                className="w-20 h-20 mx-auto"
              />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                multiple 
                className="hidden" 
              />
            </label>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center space-x-4 mb-4" style={{ marginTop: '15px' }}>
          <div ref={polaroidRef} className="bg-white p-4 shadow-lg w-60 h-72 flex flex-col items-center relative">
            {loading ? (
              <p className="text-red-500 absolute inset-0 flex justify-center items-center">변환 중...</p>
            ) : (
              pixelCanvas && (
                <img src={pixelCanvas} alt="Pixelated" className="w-[200px] h-[200px] object-cover" />
              )
            )}
            <input 
              type="text" 
              value={caption} 
              onChange={(e) => setCaption(e.target.value.slice(0, 11))} // Limit to 10 characters
              placeholder="캡션 작성 (최대 11자)" 
              className="mt-2 p-2 rounded w-full text-center absolute bottom-4 focus:outline-none"
            />
          </div>
        </div>
      )}
      <canvas id="pixelitcanvas" ref={canvasRef} className="hidden"></canvas>
      {isCropped && (
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-xs">
            <label htmlFor="pixel-range" className="block mb-2 text-sm font-medium text-white">
              픽셀화 정도: {pixelScale}
            </label>
            <input 
              id="pixel-range" 
              type="range" 
              min="2" 
              max="25" 
              value={pixelScale} 
              onChange={(e) => setPixelScale(parseInt(e.target.value))} 
              className="w-full h-2 bg-base-color rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}
      <div className="flex justify-end space-x-2" style={{ marginRight: '20px' }}>
        {pixelCanvas && !loading && (
        <>
          <Button label="다시 자르기" onClick={handleNewTransform} />
          <Button label="다운로드" onClick={handleDownload} />
          <Button label="업로드" onClick={handleUpload} />
        </>
        )}
      </div>
    </Modal>
  );
}

export default UploadModal;

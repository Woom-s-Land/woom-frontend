import React, { useRef, useEffect } from 'react';

function BgmPlayer({ isMuted }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const playMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((error) => {
        console.error('Audio play failed:', error);
      });
    } else {
      audio.pause();
      audio.currentTime = 0; // 음악을 일시정지하고 처음부터 다시 재생
    }
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src='/assets/bgm/bgm.mp3' type='audio/mpeg' />
        Your browser does not support the audio element.
      </audio>
      <button onClick={playMusic}>
        {audioRef.current && !audioRef.current.paused
          ? 'Pause Music'
          : 'Play Music'}
      </button>
    </div>
  );
}

export default BgmPlayer;

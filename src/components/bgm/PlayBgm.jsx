import { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function PlayBgm() {
  const [homeSound, setHomeSound] = useState(null);
  const [woomsSound, setWoomsSound] = useState(null);
  const isPlaying = useSelector((state) => state.setting.audioIsPlaying);
  const location = useLocation();

  // 음악을 재생할 페이지 정의
  const playMusicOnPages = {
    home: '/home',
    wooms: '/map/:woomsId',
  };

  // 현재 경로가 음악을 재생할 페이지와 일치하는지 확인
  const playOnPage = Object.keys(playMusicOnPages).find((key) => {
    const path = playMusicOnPages[key];
    return new RegExp(`^${path.replace(/:\w+/, '\\w+')}($|/)`).test(
      location.pathname
    );
  });

  useEffect(() => {
    const homeAudio = new Howl({
      src: ['/assets/bgm/homeBGM.mp3'],
      loop: true,
      volume: 0.1,
      autoplay: false,
      onload: () => {
        console.log('Home BGM is loaded');
      },
      onloaderror: (id, error) => {
        console.error('Failed to load Home BGM:', error);
      },
    });

    const woomsAudio = new Howl({
      src: ['/assets/bgm/groupBGM.mp3'],
      loop: true,
      volume: 0.1,
      autoplay: false,
      onload: () => {
        console.log('Wooms BGM is loaded');
      },
      onloaderror: (id, error) => {
        console.error('Failed to load Wooms BGM:', error);
      },
    });

    setHomeSound(homeAudio);
    setWoomsSound(woomsAudio);

    return () => {
      homeAudio.unload();
      woomsAudio.unload();
    };
  }, []);

  useEffect(() => {
    if (homeSound && woomsSound) {
      if (playOnPage === 'home') {
        homeSound.play();
        woomsSound.pause();
        woomsSound.seek(0);
      } else if (playOnPage === 'wooms') {
        woomsSound.play();
        homeSound.pause();
        homeSound.seek(0);
      } else {
        homeSound.pause();
        homeSound.seek(0);
        woomsSound.pause();
        woomsSound.seek(0);
      }
    }
  }, [playOnPage, homeSound, woomsSound]);

  useEffect(() => {
    if (homeSound && woomsSound) {
      homeSound.mute(isPlaying);
      woomsSound.mute(isPlaying);
    }
  }, [isPlaying, homeSound, woomsSound]);

  return null;
}

export default PlayBgm;

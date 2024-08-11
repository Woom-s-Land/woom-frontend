import { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { useSelector } from 'react-redux';

function PlayBgm({ playOnPage }) {
  const [sound, setSound] = useState(null);
  const isPlaying = useSelector((state) => state.setting.audioIsPlaying);

  useEffect(() => {
    const audio = new Howl({
      src: ['/assets/bgm/bgm.mp3'],
      loop: true,
      volume: 0.1,
      autoplay: true,
      onload: () => {
        console.log('BGM is loaded');
      },
    });

    setSound(audio);

    return () => {
      audio.unload();
    };
  }, []);

  useEffect(() => {
    if (sound) {
      if (playOnPage) {
        sound.play();
      } else {
        sound.pause();
        sound.seek(0);
      }
    }
  }, [playOnPage, sound]);

  useEffect(() => {
    if (sound) {
      sound.mute(isPlaying);
    }
  }, [isPlaying, sound]);

  return null;
}

export default PlayBgm;

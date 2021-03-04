import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';

import Player from './Player';

export default function SoundState({ sound, music, volume }) {
  const [stateSound, setStateSound] = useState(false);
  const [stateMusic, setStateMusic] = useState(false);
  const [stateVolume, setStateVolume] = useState(null);
  const audioRef = useRef();

  const audio = audioRef.current;

  useEffect(() => {
    const updateState = () => {
      setStateSound(sound);
      setStateVolume(volume);
      setStateMusic(music);
    };

    updateState();
  }, [sound, music, volume]);

  const [playMusic, { stop, isPlaying }] = useSound('../static/sounds/duck-souce.mp3', {
    volume: stateVolume / 100,
  });

  const soundMsg = (
    <strong className="text-orange-600 dark:text-pink-500">{stateSound ? 'On' : 'Off'}</strong>
  );

  const musicMsg = (
    <strong className="text-orange-600 dark:text-pink-500">{stateMusic ? 'On' : 'Off'}</strong>
  );

  return (
    <div className="absolute flex flex-col top-8 md:top-12" ref={audio}>
      <span className="text-sm">Sound {soundMsg}</span>
      <span className="text-sm">Volume: {stateSound || stateMusic ? stateVolume : 'Off'}</span>
      <span className="text-sm">Music {musicMsg}</span>
      <Player play={playMusic} stop={stop} isPlaying={isPlaying} stateMusic={stateMusic} />
    </div>
  );
}

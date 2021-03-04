import React, { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';

export default function SoundState({ sound, volume }) {
  const [stateSound, setStateSound] = useState(false);
  const [stateVolume, setStateVolume] = useState(null);
  // const [playMusic, { stop }] = useSound('../static/sounds/duck-souce.mp3');
  const audioRef = useRef();

  const audio = audioRef.current;

  useEffect(() => {
    const updateState = () => {
      setStateSound(sound);
      setStateVolume(volume);
    };

    updateState();
  }, [sound, volume]);

  console.log('Id - ', stateVolume);

  return (
    <div style={{ height: 32 }} className="absolute top-10 md:top-14" ref={audio}>
      {stateSound ? (
        <>
          <span className="text-sm">Sound On</span>
          <div style={{ width: 32, height: 32 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </div>
          <span className="text-sm">Volume: {stateVolume}</span>
        </>
      ) : (
        <>
          <span className="text-sm">Sound Off</span>
          <div style={{ width: 32, height: 32 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clipRule="evenodd"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}

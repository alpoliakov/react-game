import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import useKeyboardShortcut from '../hooks/useKeyboardShortcut';

const Pause = ({ stop }) => {
  return (
    <svg
      className="button cursor-pointer hover:text-orange-600"
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 70 70"
      onClick={() => stop()}>
      <polygon points="0,0 15,0 15,60 0,60" />
      <polygon points="25,0 40,0 40,60 25,60" />
    </svg>
  );
};

const Play = ({ play, stateMusic }) => {
  return (
    <svg
      className="button cursor-pointer hover:text-orange-600"
      viewBox="0 0 70 70"
      fill="currentColor"
      stroke="currentColor"
      onClick={() => {
        if (!stateMusic) {
          return;
        }
        play();
      }}>
      <polygon points="0,0 50,30 0,60" />
    </svg>
  );
};

const Player = ({ play, stop, isPlaying, stateMusic }) => {
  const keyPlayMusic = ['w'];
  const [switchMusic, setSwitchMusic] = useState(false);

  useEffect(() => {
    setSwitchMusic(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const playBarbara = () => {
      if (switchMusic) {
        return play();
      }
      stop();
    };

    return playBarbara();
  }, [switchMusic]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handleKeyboard = () => {
    if (!stateMusic) return;
    setSwitchMusic(!switchMusic);
  };

  useKeyboardShortcut(keyPlayMusic, handleKeyboard, { overrideSystem: false });

  return (
    <Tooltip
      title={stateMusic ? (isPlaying ? 'Stop music' : 'Play music') : 'Music off'}
      placement="topLeft"
      color="geekblue">
      <div
        style={{ width: 28, height: 28 }}
        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 absolute top-20 player">
        {isPlaying ? <Pause stop={stop} /> : <Play play={play} stateMusic={stateMusic} />}
      </div>
    </Tooltip>
  );
};

export default Player;

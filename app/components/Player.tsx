import React, { useEffect } from 'react';
import useSound from 'use-sound';

const Pause = ({ stop }) => {
  return (
    <svg className="button" viewBox="0 0 60 60" onClick={() => stop()}>
      <polygon points="0,0 15,0 15,60 0,60" />
      <polygon points="25,0 40,0 40,60 25,60" />
    </svg>
  );
};

const Play = ({ play }) => {
  return (
    <svg className="button" viewBox="0 0 60 60" onClick={play}>
      <polygon points="0,0 50,30 0,60" />
    </svg>
  );
};

const Player = () => {
  const [play, { stop, isPlaying }] = useSound('../static/sounds/duck-souce.mp3');

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return (
    <div style={{ width: 30, height: 30 }} className="absolute top-40 player">
      {isPlaying ? <Pause stop={stop} /> : <Play play={play} />}
    </div>
  );
};

export default Player;

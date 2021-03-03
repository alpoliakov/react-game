import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

export default function Music() {
  const [state, setState] = useState({});
  const [playMusic, { stop }] = useSound('../static/sounds/duck-souce.mp3');

  useEffect(() => {
    stop();
    console.log('Music - ', state);
    if (state) {
      playMusic();
      return;
    }
  }, [state]);

  return (
    <div className="absolute top-10">
      <span>Off</span>
    </div>
  );
}

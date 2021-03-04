import React, { useEffect } from 'react';
import useSound from 'use-sound';

const Play = ({ play }) => {
  return (
    <>
      <span className="text-sm">Music Off</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="30"
        viewBox="0 0 68 60"
        className="button"
        onClick={play}>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fillRule="nonzero">
            <g>
              <path
                fill="#1D1D1B"
                d="M33.58.536L15.875 16.77H2.017C.903 16.77 0 17.66 0 18.757v22.488l.006.148c.077 1.028.948 1.838 2.01 1.838h13.859L33.58 59.464c1.29 1.182 3.392.281 3.392-1.454V1.99c0-1.735-2.102-2.636-3.392-1.454zm-.643 6.016v46.895L18.042 39.791l-.129-.109a2.037 2.037 0 00-1.245-.424H4.033V20.741h12.635c.51 0 1-.19 1.374-.532L32.937 6.552z"></path>
              <path
                fill="#1A1919"
                d="M67.1749541 22.0358335L64.3663191 19.2271985 56.402 27.191 48.4379862 19.2271985 45.6293512 22.0358335 53.593 30 45.6293512 37.9641665 48.4379862 40.7728015 56.402 32.808 64.3663191 40.7728015 67.1749541 37.9641665 59.211 30z"></path>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};

const Pause = ({ stop }) => {
  return (
    <>
      <span className="text-sm">Music On</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="30"
        viewBox="0 0 70 60"
        className="button"
        onClick={() => stop()}>
        <path
          fill="#1d1d1b"
          d="M33.58.536c1.29-1.182 3.392-.281 3.392 1.454v56.02c0 1.735-2.102 2.636-3.392 1.454L15.875 43.23H2.017c-1.063 0-1.934-.81-2.011-1.838L0 41.244V18.756c0-1.097.903-1.986 2.017-1.986h13.858zm-.643 6.016L18.042 20.209a2.034 2.034 0 01-1.374.533L4.033 20.74v18.517h12.635c.453 0 .891.15 1.245.424l.129.109 14.895 13.656zm27.15.098c13.356 12.59 13.168 33.228-.274 46.306l-.412.394-2.79-2.869C68.7 39.087 69.102 21.018 57.65 9.855l-.351-.336zm-7.272 4.537c10.879 10.142 10.725 26.78-.218 37.309l-.335.317-2.773-2.884c9.514-8.87 9.834-22.907.836-31.588l-.284-.27zm-7.185 6.56c7.408 6.665 7.497 17.5.265 24.262l-.265.243-2.72-2.932c5.66-5.092 5.745-13.223.253-18.406l-.253-.234z"></path>
      </svg>
    </>
  );
};

const Audio = () => {
  const [play, { stop, isPlaying }] = useSound('../static/sounds/duck-souce.mp3');

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return <div className="player">{isPlaying ? <Pause stop={stop} /> : <Play play={play} />}</div>;
};

export default Audio;

import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';

import Spacer from '../helpers/Spacer';
import UnstyledButton from '../helpers/UnstyledButton';

const PRIMARY = 'hsl(240deg, 85%, 55%)';
const ARROW_DELAY = 125;

export default function HoverLink({ text, path }) {
  const [isHovering, setIsHovering] = React.useState(false);
  const { push } = useRouter();
  const poppingSound = '../static/sounds/pop.mp3';
  const [play, { stop }] = useSound(poppingSound);

  return (
    <Button
      onMouseEnter={() => {
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}
      onClick={() => push(path)}>
      <ButtonContents isHovering={isHovering}>{text}</ButtonContents>
    </Button>
  );
}

const ButtonContents = ({ isHovering, children }) => {
  return (
    <>
      {children}
      <Spacer size={8} />
      <ArrowSvg width="36" height="12" viewBox="0 0 36 12" fill="none">
        <path
          d="M0.75 6H11.25 M6 0.75L11.25 6L6 11.25"
          stroke={PRIMARY}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            // eslint-disable-next-line no-constant-condition
            opacity: true ? 1 : 0,
            transition: `opacity ${isHovering ? 0 : ARROW_DELAY}ms`,
          }}
        />

        <path
          d="M15 10L19.5 5.5L15 1"
          stroke={PRIMARY}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: `opacity ${isHovering ? 0 : ARROW_DELAY}ms`,
          }}
        />
        <path
          d="M23 10L27.5 5.5L23 1"
          stroke={PRIMARY}
          strokeOpacity="0.66"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: `opacity ${isHovering ? 0 : ARROW_DELAY}ms ${ARROW_DELAY}ms`,
          }}
        />
        <path
          d="M31 10L35.5 5.5L31 1"
          stroke={PRIMARY}
          strokeOpacity="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: `opacity ${isHovering ? 0 : ARROW_DELAY}ms ${ARROW_DELAY * 2}ms`,
          }}
        />
      </ArrowSvg>
    </>
  );
};

const Button = styled(UnstyledButton)`
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  margin-top: 0;
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
`;

const ArrowSvg = styled.svg`
  transform: translateY(2px);
`;

import { motion } from 'framer-motion';
import React from 'react';

const easing = [0.175, 0.85, 0.42, 0.96];

const cardVariants = {
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: easing,
    },
  },
};

export default function Card({ number, suit }) {
  const combo = number ? `${number}${suit}` : null;
  const color = suit === '♦' || suit === '♥' ? 'card-red' : 'card';

  return (
    <td>
      <div
        className={`${color} bg-gray-300 dark:bg-gray-200 inset-0 transform hover:scale-150 transition duration-300`}>
        {combo}
      </div>
    </td>
  );
}

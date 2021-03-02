import React from 'react';

export default function Card({ number, suit }) {
  const combo = number ? `${number}${suit}` : null;
  const color = suit === '♦' || suit === '♥' ? 'card-red' : 'card';

  return (
    <td>
      <div className={color}>{combo}</div>
    </td>
  );
}

import React from 'react';
import { ClockFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';

import HeaderBadge from './HeaderBadge';
import { useInterval } from '@/lib/hooks';

// Return only the bit that shows "mm:ss".
const formatTime = (time) => new Date(time).toTimeString().slice(3, 8);

export default function Score() {
  const dispatch = useDispatch();
  const { elapsed, hasWon, matches, revealed, tries } = useSelector((state) => state);
  const totalMatches = Object.keys(revealed).length / 2;

  useInterval(() => {
    if (!hasWon) {
      dispatch({
        type: 'TICK',
        tick: Date.now(),
      });
    }
  });

  return (
    <div className="d-flex">
      <HeaderBadge>Tries: {tries}</HeaderBadge>

      <HeaderBadge className="mr-3 ml-3">
        Matches: {matches}/{totalMatches}
      </HeaderBadge>

      <HeaderBadge>
        <ClockFill className="mr-1" />

        {formatTime(elapsed)}
      </HeaderBadge>
    </div>
  );
}

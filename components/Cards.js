import { generate } from '@prescott/geo-pattern';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import ReactCardFlip from 'react-card-flip';
import { useDispatch, useSelector } from 'react-redux';

import CardFace from './CardFace';
import { CARD_FLIP_SPEED, TRANSPARENT_PIXEL } from '@/lib/constants';

export default function Cards() {
  const [pattern, setPattern] = useState(null);
  const dispatch = useDispatch();
  const { currentPair, hasWon, revealed, seed } = useSelector((state) => state);

  const handleReveal = (index) => {
    if (!hasWon && currentPair.length < 2 && !currentPair.includes(index)) {
      dispatch({ type: 'CARD_REVEAL', index });
    }
  };

  // Generate card backs.
  useEffect(() => {
    generate({ input: seed }).then((pattern) => setPattern(pattern.toDataURL()));
  }, [seed]);

  // Handle all side-effects of card flipping.
  useEffect(() => {
    setTimeout(() => {
      // If two cards are revealed, check if they have the same (primitive) value and set score
      // accordingly.
      if (currentPair.length === 2) {
        if (revealed[currentPair[0]] === revealed[currentPair[1]]) {
          dispatch({ type: 'SCORE_MATCH' });
        } else {
          currentPair.forEach((index) => dispatch({ type: 'CARD_HIDE', index }));
        }
        dispatch({ type: 'SCORE_TRY' });
      }

      // If all cards are revealed, then we won!
      if (Object.values(revealed).every((value) => value !== null)) {
        dispatch({ type: 'SCORE_WIN' });
      }
    }, CARD_FLIP_SPEED.MS);
  }, [dispatch, currentPair, revealed]);

  if (!pattern) {
    return (
      <div className="d-flex" style={{ justifyContent: 'center' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading ...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Row xs={2} sm={3} md={4}>
      {Object.keys(revealed).map((index) => (
        <Col key={index} className="mb-4">
          <ReactCardFlip
            flipSpeedBackToFront={CARD_FLIP_SPEED.S}
            flipSpeedFrontToBack={CARD_FLIP_SPEED.S}
            isFlipped={Boolean(revealed[index])}
          >
            <CardFace onReveal={() => handleReveal(index)} pattern={pattern} />

            <CardFace
              onReveal={() => handleReveal(index)}
              pattern={TRANSPARENT_PIXEL}
              value={revealed[index]}
            />
          </ReactCardFlip>
        </Col>
      ))}
    </Row>
  );
}

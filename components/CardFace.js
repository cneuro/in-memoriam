import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

export default function CardFace({ pattern, onReveal, value }) {
  const imageRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(imageRef.current.width);
  }, [imageRef.current?.width]);

  return (
    <Card
      className="text-center"
      bg="dark"
      text="light"
      onClick={onReveal}
      style={{ cursor: 'pointer' }}
    >
      <Card.Body>
        <Image src={pattern} style={{ height, width: '100%' }} ref={imageRef} rounded />

        {value && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '5rem',
            }}
          >
            {value}
          </span>
        )}
      </Card.Body>
    </Card>
  );
}

CardFace.propTypes = {
  pattern: PropTypes.string,
  onReveal: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

CardFace.defaultProps = {
  pattern: null,
  onReveal: () => {},
  value: null,
};

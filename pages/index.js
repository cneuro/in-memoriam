import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import Cards from '@/components/Cards';
import Header from '@/components/Header';
import Score from '@/components/Score';
import { shuffleCards } from '@/store';

export default function Index() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(true);
  const { hasWon } = useSelector((state) => state);

  useEffect(() => {
    if (!hasWon) {
      setShowModal(true);
    }
  }, [hasWon]);

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    shuffleCards();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />

      <Container>
        <div className="d-none d-sm-block" style={{ marginTop: '2.5rem' }} />

        <div className="d-sm-none" style={{ marginTop: '4rem' }} />

        <div
          className="d-sm-none p-1"
          style={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            zIndex: 100,
            borderRadius: '0.5rem',
          }}
        >
          <Score />
        </div>

        <div style={{ paddingTop: '2.5rem' }}>
          <Cards />
        </div>

        <Modal show={hasWon && showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Your final tally: <Score />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleReset}>
              Reset
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

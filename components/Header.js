import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Github, QuestionSquare } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';

import Score from './Score';
import { shuffleCards } from '@/store';

export default function Header() {
  const dispatch = useDispatch();
  const gridLength = Object.keys(useSelector((state) => state.revealed)).length;

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    shuffleCards();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>
          in-memoriam
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Popover>
                <Popover.Title as="h4">How to play</Popover.Title>

                <Popover.Content>
                  <p>
                    {
                      'Click a card to reveal a number from 1 to 6. If the cards match, they stay revealed. If not, they are covered up again.'
                    }
                  </p>

                  <p>
                    {
                      'You win once all card pairs are revealed. Get your Tries as close to your Matches as possible in the least amount of time!'
                    }
                  </p>

                  <p>{'To reset the game at any time, click Reset.'}</p>

                  <p className="d-md-none">
                    <strong>{`If you can't see all ${gridLength} cards, remember to scroll down!`}</strong>
                  </p>
                </Popover.Content>
              </Popover>
            }
          >
            <QuestionSquare className="ml-2" style={{ cursor: 'pointer' }} />
          </OverlayTrigger>
        </Navbar.Brand>

        <Nav className="d-none d-sm-block ml-auto mr-auto">
          <Score />
        </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" style={{ flexGrow: 0 }}>
          <Nav style={{ flexDirection: 'row' }}>
            <Button
              variant="outline-light"
              href="https://www.github.com/cneuro/in-memoriam"
              className="d-flex mr-3"
              style={{ alignItems: 'center' }}
            >
              <Github className="mr-1" /> Source
            </Button>

            <Button variant="danger" onClick={handleReset}>
              Reset
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

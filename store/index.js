import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { CARD_VALUES } from '@/lib/constants';

let store;
// This is what this session's cards will be.
const cards = [];

const initialState = {
  currentPair: [],
  elapsed: 0,
  matches: 0,
  // The revealed array of cards represents the WYSIWYG card grid on the frontend.
  revealed: Object.assign({}, new Array(CARD_VALUES.length * 2).fill(null)),
  tock: null,
  tries: 0,
  hasWon: false,
  seed: nanoid(),
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CARD_HIDE':
      return {
        ...state,
        currentPair: state.currentPair.filter((index) => index !== action.index),
        revealed: { ...state.revealed, [action.index]: null },
      };
    case 'CARD_REVEAL':
      return {
        ...state,
        currentPair: [...state.currentPair, action.index],
        revealed: { ...state.revealed, [action.index]: cards[action.index] },
      };
    case 'SCORE_MATCH':
      return {
        ...state,
        currentPair: [],
        matches: state.matches + 1,
      };
    case 'SCORE_TRY':
      return {
        ...state,
        tries: state.tries + 1,
      };
    case 'SCORE_WIN':
      return {
        ...state,
        hasWon: true,
      };
    case 'TICK':
      return {
        ...state,
        elapsed: state.elapsed + (action.tick - (state.tock || Date.now())),
        tock: action.tick,
      };
    case 'RESET':
      return { ...initialState, seed: nanoid() };
    default:
      return state;
  }
};

const initStore = (preloadedState = initialState) => {
  // Make sure we can't "debug" the store by arbitrarily changing the score :)
  const composeEnhancers = composeWithDevTools({
    actionsBlacklist: 'SCORE_',
  });

  return createStore(reducers, preloadedState, composeEnhancers(applyMiddleware()));
};

const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store.
  if (typeof window === 'undefined') {
    return _store;
  }

  // Create the store once in the client.
  if (!store) {
    store = _store;
  }

  return _store;
};

// TODO - find a way to use Hooks instead of static hoisting that don't expose the internal
// 'cards' variable in the store. This would allow for the shuffling to occur automatically on every
// RESET according to seed change.
export const shuffleCards = () => {
  // Randomly generate an array of card pairs based on the available card values.
  // Shuffler adapted from https://stackoverflow.com/a/46545530
  cards.splice(0, cards.length);
  const shuffledCards = CARD_VALUES.concat(CARD_VALUES)
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
  cards.push(...shuffledCards);
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  shuffleCards();

  return store;
};

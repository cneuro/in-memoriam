# in-memoriam

https://in-memoriam.vercel.app/

## What is this?

A simple card pair-matching memory game.

## How does it work?

You are presented with a 4-by-4 grid of 12 cards. Click a card to reveal a number from 1 to 6. Then reveal another card. If both have matching numbers, they stay revealed and you get a match. If they don't match, they are covered up again. Every time a pair is revealed regardless of if they match, your Tries go up by one.

You cannot hide a card yourself once you reveal it. The game is over when all of the six card pairs are revealed. Get your Tries as close to your Matches as possible in the least amount of time!

The card order and card back image are randomized every time the game is reset. To reset the game before you've won, click the Reset button on the top toolbar.

## Development

Some weekend fun in Coronatimes :)

### Setup

Clone the repo to your local filesystem, then `cd` into the root directory. Next, run the following commands:

```bash
# install dependencies
$ npm install

# Build & serve locally with hot module reload
$ npm run dev
```

The app is now live on http://localhost:3000.

### Configuration

The game has a default of six card pairs whose value range from 1 to 6, which result in a grid 12 cards. In [`constants.js`](/lib/constants.js), you will find the variable `CARD_VALUES`. Changing that array to any (non-duplicate) set of values will allow you to change how many card pairs there are to play with and what their (string or number) face-up value is.

### About

The app is built on [NextJS](https://nextjs.org/) which provides an easily-deployable framework using [React](https://reactjs.org/) & [Redux](https://redux.js.org/) for immutable state management. Redux keeps the order of cards secret until the player reveals them. We don't trust the client, only the store. This prevents game state tampering like arbitrarily increasing the score, scraping the DOM for card values or changing the timer.

Using [React Bootstrap](https://react-bootstrap.github.io/) as a frontend framework provides attractive foundational UI layout & components. It implements [ReactCardFlip](https://github.com/AaronCCWong/react-card-flip) for the card reveal animations. A TypeScript [GeoPattern](https://github.com/mooyoul/geo-pattern) library is used to randomly generate unique card backs for every game via a [nanoid](https://github.com/ai/nanoid) seed.

The app is hosted live on [Vercel](https://vercel.com/) to facilitate turnkey deployment and CI. Finally, [ESLint](https://eslint.org/) and [husky](https://github.com/typicode/husky) are used alongside other linting tools to keep the code nice and tidy for every commit.

The UI is mobile-ready, so loading this on a small screen will look & work great!

***Why hooks instead of classes, lifecycle methods & higher order components?***

It seems like [the](https://overreacted.io/a-complete-guide-to-useeffect/) [future](https://blog.bitsrc.io/6-reasons-to-use-react-hooks-instead-of-classes-7e3ee745fe04) [of](https://blog.logrocket.com/why-you-should-adopt-react-hooks-instead-of-classes/) [React](https://reactjs.org/docs/hooks-faq.html).

## (UN)LICENSE

This is free and unencumbered software released into the public domain.

For more details, please see [LICENSE](/LICENSE).

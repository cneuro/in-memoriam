// Used to fill the height of a face-up card. https://png-pixel.com/
export const TRANSPARENT_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

// All possible values of a card. Duplicates itself once to reach all possible card pairs.
// Values could also be strings, out of order numbers or any primitive symbol (that works with ===).
export const CARD_VALUES = [1, 2, 3, 4, 5, 6];

// The speed in seconds & milliseconds of the card flip animation.
// Also used to determine when to check for game states.
export const CARD_FLIP_SPEED = {
  S: 0.5,
  MS: 500,
};

import { useEffect, useRef } from 'react';

// Thank you Dan Abramov!
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay = 1000) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const interval = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(interval);
  }, [delay]);
}

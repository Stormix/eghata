/* eslint-disable */

import { useEffect, useState } from "react";

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize

      // eslint-disable-next-line
      // @ts-ignore
      function handleResize() {
        // Set window width/height to state
        // eslint-disable-next-line
        // @ts-ignore
        setWindowSize({
          // eslint-disable-next-line
          // @ts-ignore
          width: window.innerWidth,
          // eslint-disable-next-line
          // @ts-ignore
          height: window.innerHeight
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

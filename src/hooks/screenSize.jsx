import { useState, useEffect } from "react";

// Hook
const useWindowSize = () => {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      isPc: isClient ? (window.innerWidth >= 1280 ? true : false) : undefined,
      isTablet: isClient
        ? window.innerWidth < 1280 && window.innerWidth > 640
          ? true
          : false
        : undefined,
      isPhone: isClient ? (window.innerWidth <= 640 ? true : false) : undefined,
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

export default useWindowSize;

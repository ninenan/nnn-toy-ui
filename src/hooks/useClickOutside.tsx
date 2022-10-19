import React, { RefObject, useEffect } from 'react';

const useClickOutSide = (
  ref: RefObject<HTMLElement>,
  handle: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handle(event);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handle]);
};

export default useClickOutSide;

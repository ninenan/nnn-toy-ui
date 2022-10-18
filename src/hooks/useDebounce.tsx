import { useState, useEffect } from 'react';

const useDebounce = <T,>(val: T, delay = 300): T => {
  const [debounce, setDebounce] = useState<T>(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(val);
    }, delay);

    return () => clearTimeout(timer);
  }, [val, delay]);

  return debounce;
};

export default useDebounce;

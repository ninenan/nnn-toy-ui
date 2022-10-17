import { useState, useEffect } from 'react';

const useDebounce = (val: () => void, delay = 300) => {
  const [debounce, setDebounce] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(val);
    }, delay);

    return () => clearTimeout(handler);
  }, [val, delay]);

  return debounce;
};

export default useDebounce;

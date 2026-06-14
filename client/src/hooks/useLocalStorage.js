import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch {
      // Corrupted value (e.g. "undefined" stored by a bug) — clean it up and use default
      localStorage.removeItem(key);
      return defaultValue;
    }
  });

  useEffect(() => {
    // Never write undefined — it serializes to the string "undefined" which JSON.parse can't read back
    if (value === undefined) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;

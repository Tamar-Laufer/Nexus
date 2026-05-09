// hook גנרי לניהול state שנשמר אוטומטית ב-localStorage
// כך הנתונים נשמרים גם לאחר ריענון הדפדפן
import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
  // אתחול עצלן - קורא מ-localStorage פעם אחת בלבד, לא בכל render
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });

  // בכל שינוי של value - מעדכן את localStorage אוטומטית
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // מחזיר בדיוק כמו useState - [ערך, פונקציית עדכון]
  return [value, setValue];
};

export default useLocalStorage;

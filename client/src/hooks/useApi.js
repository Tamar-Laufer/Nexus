import { useState } from 'react'; // hook לניהול state

const BASE_URL = 'http://localhost:3001'; // כתובת השרת - פורט 3001

// hook מרכזי לביצוע קריאות API לשרת
const useApi = () => {
  const [loading, setLoading] = useState(false); // מצב טעינה - true בזמן בקשה
  const [error, setError] = useState(null);      // שגיאה אחרונה שהתרחשה

  // פונקציה לביצוע בקשת HTTP לשרת
  const apiCall = async (endpoint, options = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, { // שליחת הבקשה לשרת
      headers: { 'Content-Type': 'application/json', ...options.headers }, // header לJSON + headers נוספים
      ...options, // שאר האפשרויות (method, body וכו')
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`); // זריקת שגיאה אם הסטטוס לא 2xx
    return await response.json(); // המרת התגובה ל-JSON והחזרה
  };

  // פונקציה עוטפת שמנהלת את מצב הטעינה והשגיאה אוטומטית
  const execute = async (apiFunction) => {
    setLoading(true);  // מציין שבקשה מתבצעת
    setError(null);    // מנקה שגיאה קודמת
    try {
      const result = await apiFunction(); // הרצת פונקציית ה-API שהועברה
      return result;   // החזרת התוצאה
    } catch (err) {
      setError(err.message); // שמירת הודעת השגיאה
      throw err;             // זריקה מחדש כדי שהקומפוננטה תוכל לטפל בה
    } finally {
      setLoading(false); // תמיד מבטל את מצב הטעינה בסוף
    }
  };

  return { apiCall, execute, loading, error }; // יצוא הפונקציות והמצבים
};

export default useApi;

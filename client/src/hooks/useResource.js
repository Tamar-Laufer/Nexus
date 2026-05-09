// hook גנרי שמחבר בין שכבת ה-HTTP לניהול רשימות
// כל משאב (todos, posts, comments) משתמש ב-hook הזה עם הנתיב שלו
import { useState } from 'react';
import useApi from './useApi';

const useResource = (path) => {
  const { apiCall, execute, loading, error } = useApi(); // כלי ה-HTTP הבסיסיים
  const [items, setItems] = useState(null); // null = טרם נטענו נתונים

  // --- שאילתות HTTP ישירות לשרת ---

  // GET /path?suffix - שליפה עם אפשרות לסינון או עימוד
  const get = (suffix = '') => execute(() => apiCall(`${path}${suffix}`));

  // POST /path - יצירת פריט חדש
  const create = (data) => execute(() => apiCall(path, {
    method: 'POST',
    body: JSON.stringify(data)
  }));

  // PUT /path/:id - עדכון פריט קיים, suffix אופציונלי (לדוגמה: /credentials)
  const update = (id, data, suffix = '') => execute(() => apiCall(`${path}/${id}${suffix}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }));

  // DELETE /path/:id - מחיקת פריט, body אופציונלי לאימות בעלות
  const remove = (id, body) => execute(() => apiCall(`${path}/${id}`, {
    method: 'DELETE',
    ...(body && { body: JSON.stringify(body) })
  }));

  // --- ניהול רשימה: HTTP + עדכון state אוטומטי ---

  // טעינת רשימה מהשרת ושמירה ב-items
  const load = async (query = '') => setItems((await get(query)) || []);

  // יצירת פריט + הוספתו לסוף הרשימה
  const add = async (data, onSuccess) => {
    try {
      const created = await create(data);
      setItems(p => [...(p || []), created]);
      onSuccess?.();
      return created;
    } catch { /* שגיאות מטופלות ב-useApi */ }
  };

  // עדכון פריט + החלפתו ברשימה, מעביר את הערך המעודכן ל-onSuccess
  const save = async (id, data, onSuccess, suffix = '') => {
    try {
      const updated = await update(id, data, suffix);
      setItems(p => (p || []).map(i => i.id == id ? updated : i));
      onSuccess?.(updated);
      return updated;
    } catch { /* שגיאות מטופלות ב-useApi */ }
  };

  // מחיקת פריט + הסרתו מהרשימה
  const del = async (id, body, onSuccess) => {
    try {
      await remove(id, body);
      setItems(p => (p || []).filter(i => i.id != id));
      onSuccess?.();
    } catch { /* שגיאות מטופלות ב-useApi */ }
  };

  return { items, setItems, get, create, update, remove, load, add, save, del, apiCall, execute, loading, error };
};

export default useResource;

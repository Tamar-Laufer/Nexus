// פונקציות עזר משותפות לכל ה-controllers

// 404 - פריט לא נמצא
const notFound = (res, resource = 'Item') =>
  res.status(404).json({ message: `${resource} not found` });

// 403 - אין הרשאה
const notAuthorized = (res) =>
  res.status(403).json({ message: 'Not authorized' });

// 500 - שגיאת שרת
const serverError = (res, err) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
};

// הסרת id מהבודי - השרת מייצר ID אקראי משלו
const stripId = (body) => {
  const { id, ...data } = body;
  return data;
};

// בדיקת קיום ובעלות - גנרית לכל משאב
// getById   - פונקציה לשליפת הפריט מהדאטהבייס
// id        - ה-id מה-URL
// isOwner   - פונקציה שבודקת אם המשתמש הוא הבעלים
// resource  - שם המשאב להודעת שגיאה
const validateItem = async (res, getById, id, isOwner, resource) => {
  const existing = await getById(id);
  if (!existing) { notFound(res, resource); return null; }
  if (!isOwner(existing)) { notAuthorized(res); return null; }
  return existing;
};

module.exports = { notFound, notAuthorized, serverError, stripId, validateItem };

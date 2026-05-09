const db = require('./connection');              // חיבור לדאטהבייס
const { getUserById } = require('./usersQueries'); // פונקציה לשליפת משתמש לפי ID

// פונקציה לאימות כניסה - בודקת שם משתמש וסיסמה מול הדאטהבייס
const login = async (username, password) => {
  const [rows] = await db.query(
    // שאילתה שמצרפת את טבלת המשתמשים עם טבלת הסיסמאות
    `SELECT u.id FROM users u
     JOIN passwords p ON u.id = p.userId
     WHERE u.username = ? AND p.password = ?`,
    [username, password] // פרמטרים מוגנים מפני SQL injection
  );
  if (rows.length === 0) return null; // לא נמצא משתמש תואם - כניסה נכשלה
  return getUserById(rows[0].id);    // מחזיר את פרטי המשתמש המלאים
};

module.exports = { login }; // יצוא הפונקציות לשימוש ב-controllers

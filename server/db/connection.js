const mysql = require('mysql2'); // טעינת ספריית mysql2 לחיבור עם MySQL

// יצירת מאגר חיבורים (connection pool) לדאטהבייס
const pool = mysql.createPool({
  host: 'localhost',         // כתובת שרת MySQL - רץ על אותו מחשב
  user: 'root',             // שם המשתמש של MySQL
  password: 'tamar4212',    // סיסמת MySQL
  database: 'jsonplaceholder', // שם הדאטהבייס שנוצר ב-setup.js
  waitForConnections: true, // ממתין לחיבור פנוי במקום לזרוק שגיאה
  connectionLimit: 10       // מקסימום 10 חיבורים במקביל
});

module.exports = pool.promise(); // יצוא ה-pool עם תמיכה ב-async/await

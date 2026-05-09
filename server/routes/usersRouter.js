const express = require('express');                                    // טעינת Express
const router = express.Router();                                       // יצירת router נפרד
const { getUsers, getUser, postUser, putUser, putCredentials } = require('../controllers/usersController'); // טעינת הפונקציות

router.get('/', getUsers);      // GET /users - שליפת כל המשתמשים
router.get('/:id', getUser);   // GET /users/:id - שליפת משתמש לפי ID
router.post('/', postUser);    // POST /users - יצירת משתמש חדש (הרשמה)
router.put('/:id', putUser);                    // PUT /users/:id - עדכון פרטי משתמש
router.put('/:id/credentials', putCredentials); // PUT /users/:id/credentials - עדכון שם משתמש/סיסמה

module.exports = router; // יצוא ה-router לשימוש ב-server.js

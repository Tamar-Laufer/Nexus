const express = require('express');                         // טעינת Express
const router = express.Router();                            // יצירת router נפרד לנתיב זה
const { handleLogin } = require('../controllers/loginController'); // טעינת הפונקציה מה-controller

router.post('/', handleLogin); // POST /login - מטפל בבקשת כניסה למערכת

module.exports = router; // יצוא ה-router לשימוש ב-server.js

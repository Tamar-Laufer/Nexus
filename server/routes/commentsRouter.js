const express = require('express');                                                                                                // טעינת Express
const router = express.Router();                                                                                                   // יצירת router נפרד
const { getCommentsHandler, createCommentHandler, updateCommentHandler, deleteCommentHandler } = require('../controllers/commentsController'); // טעינת הפונקציות

router.get('/', getCommentsHandler);         // GET /comments או GET /comments?postId=X - שליפת תגובות
router.post('/', createCommentHandler);      // POST /comments - יצירת תגובה חדשה
router.put('/:id', updateCommentHandler);    // PUT /comments/:id - עדכון תגובה (רק בעלים לפי אימייל)
router.delete('/:id', deleteCommentHandler); // DELETE /comments/:id - מחיקת תגובה (רק בעלים)

module.exports = router; // יצוא ה-router לשימוש ב-server.js

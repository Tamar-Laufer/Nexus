const express = require('express');                                                                                    // טעינת Express
const router = express.Router();                                                                                       // יצירת router נפרד
const { getPostsHandler, createPostHandler, updatePostHandler, deletePostHandler } = require('../controllers/postsController'); // טעינת הפונקציות

router.get('/', getPostsHandler);         // GET /posts או GET /posts?_start=X&_limit=Y - שליפת פוסטים עם פגינציה
router.post('/', createPostHandler);      // POST /posts - יצירת פוסט חדש
router.put('/:id', updatePostHandler);    // PUT /posts/:id - עדכון פוסט (רק בעלים)
router.delete('/:id', deletePostHandler); // DELETE /posts/:id - מחיקת פוסט (רק בעלים)

module.exports = router; // יצוא ה-router לשימוש ב-server.js

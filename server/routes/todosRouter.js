const express = require('express');                                                                              // טעינת Express
const router = express.Router();                                                                                 // יצירת router נפרד
const { getTodosHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler } = require('../controllers/todosController'); // טעינת הפונקציות

router.get('/', getTodosHandler);         // GET /todos או GET /todos?userId=X - שליפת משימות
router.post('/', createTodoHandler);      // POST /todos - יצירת משימה חדשה
router.put('/:id', updateTodoHandler);    // PUT /todos/:id - עדכון משימה לפי ID
router.delete('/:id', deleteTodoHandler); // DELETE /todos/:id - מחיקת משימה לפי ID

module.exports = router; // יצוא ה-router לשימוש ב-server.js

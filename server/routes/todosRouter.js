const express = require('express');
const router = express.Router();
const { getTodosHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler } = require('../controllers/todosController');

router.get('/', getTodosHandler);
router.post('/', createTodoHandler);
router.put('/:id', updateTodoHandler);
router.delete('/:id', deleteTodoHandler);

module.exports = router;

const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require('../db/todosQueries');
const { getAll } = require('../services/getService');
const { create } = require('../services/createService');
const { update } = require('../services/updateService');
const { remove } = require('../services/deleteService');

const noCheck = () => true; // טודוס - אין בדיקת בעלות בצד השרת

const getTodosHandler  = (req, res) => getAll(res, getTodos, req.query.userId);
const createTodoHandler = (req, res) => create(res, createTodo, req.body);
const updateTodoHandler = (req, res) => update(res, getTodoById, updateTodo, req.params.id, req.body, noCheck, 'Todo');
const deleteTodoHandler = (req, res) => remove(res, getTodoById, deleteTodo, req.params.id, req.body, noCheck, 'Todo');

module.exports = { getTodosHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler };

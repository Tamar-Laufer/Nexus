const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require('../dal/todosQueries');
const { getAll } = require('../services/getService');
const { create } = require('../services/createService');
const { update } = require('../services/updateService');
const { remove } = require('../services/deleteService');

const ownsById = (item, req) => item.userId == req.user.id;

const getTodosHandler   = (req, res) => getAll(res, getTodos, req.user.id);
const createTodoHandler = (req, res) => create(res, createTodo, { ...req.body, userId: req.user.id });
const updateTodoHandler = (req, res) => update(res, getTodoById, updateTodo, req.params.id, req.body, (t) => t.userId == req.user.id, 'Todo');
const deleteTodoHandler = (req, res) => remove(res, getTodoById, deleteTodo, req.params.id, req.body, (t) => t.userId == req.user.id, 'Todo');

module.exports = { getTodosHandler, createTodoHandler, updateTodoHandler, deleteTodoHandler };

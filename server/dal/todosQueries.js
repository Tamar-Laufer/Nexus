const { selectById, selectByField, updateRow, deleteRow, insertRowAutoId } = require('./baseQueries');

const toTodo = (row) => row ? { ...row, completed: !!row.completed } : null;

const getTodos = async (userId) => {
  const rows = await selectByField('todos', 'userId', userId);
  return rows.map(toTodo);
};

const getTodoById = async (id) => toTodo(await selectById('todos', id));

const createTodo = async (todo) =>
  toTodo(await insertRowAutoId('todos',
    ['userId', 'title', 'completed'],
    [todo.userId, todo.title, todo.completed ? 1 : 0]
  ));

const updateTodo = async (id, todo) =>
  toTodo(await updateRow('todos',
    ['title', 'completed'],
    [todo.title, todo.completed ? 1 : 0],
    id
  ));

const deleteTodo = (id) => deleteRow('todos', id);

module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };

const { selectAll, selectById, selectByField, insertRow, updateRow, deleteRow } = require('./baseQueries');

// המרת שדה completed מ-0/1 של MySQL לboolean אמיתי
const toTodo = (row) => row ? { ...row, completed: !!row.completed } : null;

// שליפת משימות - אם הועבר userId מסנן לפי משתמש, אחרת מחזיר הכל
const getTodos = async (userId) => {
  const rows = userId
    ? await selectByField('todos', 'userId', userId)
    : await selectAll('todos');
  return rows.map(toTodo);
};

const getTodoById = async (id) => toTodo(await selectById('todos', id));

const createTodo = async (todo) =>
  toTodo(await insertRow('todos',
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

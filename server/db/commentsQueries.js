const { selectAll, selectById, selectByField, insertRow, updateRow, deleteRow } = require('./baseQueries');

// שליפת תגובות - אם הועבר postId מסנן לפי פוסט, אחרת מחזיר הכל
const getComments = async (postId) =>
  postId
    ? selectByField('comments', 'postId', postId)
    : selectAll('comments');

const getCommentById = (id) => selectById('comments', id);

const createComment = (comment) =>
  insertRow('comments',
    ['postId', 'name', 'email', 'body'],
    [comment.postId, comment.name || '', comment.email || '', comment.body || '']
  );

const updateComment = (id, comment) =>
  updateRow('comments',
    ['name', 'email', 'body'],
    [comment.name || '', comment.email || '', comment.body || ''],
    id
  );

const deleteComment = (id) => deleteRow('comments', id);

module.exports = { getComments, getCommentById, createComment, updateComment, deleteComment };

const { selectById, selectByField, updateRow, deleteRow, insertRowAutoId } = require('./baseQueries');

const getComments = (postId) => selectByField('comments', 'postId', postId);

const getCommentById = (id) => selectById('comments', id);

const createComment = (comment) =>
  insertRowAutoId('comments',
    ['postId', 'email', 'body'],
    [comment.postId, comment.email || '', comment.body || '']
  );

const updateComment = (id, comment) =>
  updateRow('comments',
    ['email', 'body'],
    [comment.email || '', comment.body || ''],
    id
  );

const deleteComment = (id) => deleteRow('comments', id);

module.exports = { getComments, getCommentById, createComment, updateComment, deleteComment };

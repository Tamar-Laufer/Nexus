const { selectAll, selectById, selectByField, selectLimited, updateRow, deleteRow, insertRowAutoId } = require('./baseQueries');

const getPosts = async (userId, start, limit) => {
  if (userId) return selectByField('posts', 'userId', userId);
  if (start !== undefined && limit !== undefined) return selectLimited('posts', limit, start);
  return selectAll('posts');
};

const getPostById = (id) => selectById('posts', id);

const createPost = (post) =>
  insertRowAutoId('posts',
    ['userId', 'title', 'body'],
    [post.userId, post.title, post.body || '']
  );

const updatePost = (id, post) =>
  updateRow('posts',
    ['title', 'body'],
    [post.title, post.body || ''],
    id
  );

const deletePost = (id) => deleteRow('posts', id);

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };

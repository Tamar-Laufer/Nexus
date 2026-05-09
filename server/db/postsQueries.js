const { selectAll, selectById, selectByField, selectPaged, insertRow, updateRow, deleteRow } = require('./baseQueries');

// שליפת פוסטים - תומך בסינון לפי userId, פגינציה, או שליפת הכל
const getPosts = async (userId, start, limit) => {
  if (userId) return selectByField('posts', 'userId', userId);
  if (start !== undefined && limit !== undefined) return selectPaged('posts', limit, start);
  return selectAll('posts');
};

const getPostById = (id) => selectById('posts', id);

const createPost = (post) =>
  insertRow('posts',
    ['userId', 'title', 'body'],
    [post.userId, post.title, post.body || '']
  );

const updatePost = (id, post) =>
  updateRow('posts',
    ['title', 'body'],
    [post.title, post.body || ''],
    id
  );

const deletePost = (id) => deleteRow('posts', id); // comments נמחקים אוטומטית (CASCADE)

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };

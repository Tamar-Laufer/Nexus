const { getPosts, getPostById, createPost, updatePost, deletePost } = require('../dal/postsQueries');
const { getAll } = require('../services/getService');
const { create } = require('../services/createService');
const { update } = require('../services/updateService');
const { remove } = require('../services/deleteService');

const getPostsHandler   = (req, res) => getAll(res, getPosts, req.query.userId, req.query._start, req.query._limit);
const createPostHandler = (req, res) => create(res, createPost, { ...req.body, userId: req.user.id });
const updatePostHandler = (req, res) => update(res, getPostById, updatePost, req.params.id, req.body, (p) => p.userId == req.user.id, 'Post');
const deletePostHandler = (req, res) => remove(res, getPostById, deletePost, req.params.id, req.body, (p) => p.userId == req.user.id, 'Post');

module.exports = { getPostsHandler, createPostHandler, updatePostHandler, deletePostHandler };

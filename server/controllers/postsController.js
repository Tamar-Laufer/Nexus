const { getPosts, getPostById, createPost, updatePost, deletePost } = require('../db/postsQueries');
const { getAll } = require('../services/getService');
const { create } = require('../services/createService');
const { update } = require('../services/updateService');
const { remove } = require('../services/deleteService');

const ownsPost = (post, body) => !body.userId || post.userId == body.userId;

const getPostsHandler  = (req, res) => getAll(res, getPosts, req.query.userId, req.query._start, req.query._limit);
const createPostHandler = (req, res) => create(res, createPost, req.body);
const updatePostHandler = (req, res) => update(res, getPostById, updatePost, req.params.id, req.body, (p) => ownsPost(p, req.body), 'Post');
const deletePostHandler = (req, res) => remove(res, getPostById, deletePost, req.params.id, req.body, (p) => ownsPost(p, req.body), 'Post');

module.exports = { getPostsHandler, createPostHandler, updatePostHandler, deletePostHandler };

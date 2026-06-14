const { getComments, getCommentById, createComment, updateComment, deleteComment } = require('../dal/commentsQueries');
const { getAll } = require('../services/getService');
const { create } = require('../services/createService');
const { update } = require('../services/updateService');
const { remove } = require('../services/deleteService');

const ownsComment = (comment, req) => comment.email === req.user.email;

const getCommentsHandler   = (req, res) => getAll(res, getComments, req.query.postId);
const createCommentHandler = (req, res) => create(res, createComment, { ...req.body, email: req.user.email });
const updateCommentHandler = (req, res) => update(res, getCommentById, updateComment, req.params.id, { ...req.body, email: req.user.email }, (c) => c.email === req.user.email, 'Comment');
const deleteCommentHandler = (req, res) => remove(res, getCommentById, deleteComment, req.params.id, req.body, (c) => c.email === req.user.email, 'Comment');

module.exports = { getCommentsHandler, createCommentHandler, updateCommentHandler, deleteCommentHandler };

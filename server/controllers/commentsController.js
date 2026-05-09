const { getComments, getCommentById, createComment, updateComment, deleteComment } = require('../db/commentsQueries');
const { getAll } = require('../services/getService');
const { create } = require('../services/createService');
const { update } = require('../services/updateService');
const { remove } = require('../services/deleteService');

const ownsComment = (comment, body) => !body.email || comment.email === body.email;

const getCommentsHandler  = (req, res) => getAll(res, getComments, req.query.postId);
const createCommentHandler = (req, res) => create(res, createComment, req.body);
const updateCommentHandler = (req, res) => update(res, getCommentById, updateComment, req.params.id, req.body, (c) => ownsComment(c, req.body), 'Comment');
const deleteCommentHandler = (req, res) => remove(res, getCommentById, deleteComment, req.params.id, req.body, (c) => ownsComment(c, req.body), 'Comment');

module.exports = { getCommentsHandler, createCommentHandler, updateCommentHandler, deleteCommentHandler };

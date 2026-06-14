const express = require('express');
const router = express.Router();
const { getCommentsHandler, createCommentHandler, updateCommentHandler, deleteCommentHandler } = require('../controllers/commentsController');

router.get('/', getCommentsHandler);
router.post('/', createCommentHandler);
router.put('/:id', updateCommentHandler);
router.delete('/:id', deleteCommentHandler);

module.exports = router;

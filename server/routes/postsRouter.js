const express = require('express');
const router = express.Router();
const { getPostsHandler, createPostHandler, updatePostHandler, deletePostHandler } = require('../controllers/postsController');

router.get('/', getPostsHandler);
router.post('/', createPostHandler);
router.put('/:id', updatePostHandler);
router.delete('/:id', deletePostHandler);

module.exports = router;

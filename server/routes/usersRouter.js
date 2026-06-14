const express = require('express');
const router = express.Router();
const { getUsers, getUser, postUser, putUser, putCredentials } = require('../controllers/usersController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, getUsers);
router.get('/:id', authenticateToken, getUser);
router.post('/', postUser);
router.put('/:id', authenticateToken, putUser);
router.put('/:id/credentials', authenticateToken, putCredentials);

module.exports = router;

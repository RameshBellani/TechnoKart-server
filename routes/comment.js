const express = require('express');
const router = express.Router();
const { createComment, getCommentsByPost, approveComment, deleteComment } = require('../controllers/commentController');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');


router.post('/', authenticateJWT, createComment);
router.get('/post/:postId', getCommentsByPost);
router.put('/:id/approve', authenticateJWT, authorizeRoles('admin'), approveComment);
router.delete('/:id', authenticateJWT, authorizeRoles('admin', 'author'), deleteComment);

module.exports = router;

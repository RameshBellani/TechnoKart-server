const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/blogPostController');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');

router.post('/', authenticateJWT, authorizeRoles('admin', 'author'), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', authenticateJWT, authorizeRoles('admin', 'author'), updatePost);
router.delete('/:id', authenticateJWT, authorizeRoles('admin', 'author'), deletePost);

module.exports = router;

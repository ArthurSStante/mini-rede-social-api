const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  toggleLike,
} = require('../controllers/postController');

router.post('/', protect, createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.delete('/:id', protect, deletePost);
router.post('/:id/like', protect, toggleLike);

module.exports = router;
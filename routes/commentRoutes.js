const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  createComment,
  getCommentsByPost,
  deleteComment,
} = require('../controllers/commentController');

// Rotas aninhadas em post (precisam de mergeParams pra acessar :postId)
router.post('/posts/:postId/comments', protect, createComment);
router.get('/posts/:postId/comments', getCommentsByPost);

// Rota separada por id do comentário
router.delete('/comments/:id', protect, deleteComment);

module.exports = router;
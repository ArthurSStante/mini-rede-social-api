const Comment = require('../models/Comment');
const Post = require('../models/Post');

// POST /api/posts/:postId/comments
const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content) {
      return res.status(400).json({ message: 'O conteúdo do comentário é obrigatório.' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    const comment = await Comment.create({
      author: req.userId,
      post: postId,
      content,
    });

    const populatedComment = await comment.populate('author', 'name avatar');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar comentário.', error: error.message });
  }
};

// GET /api/posts/:postId/comments
const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar comentários.', error: error.message });
  }
};

// DELETE /api/comments/:id
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentário não encontrado.' });
    }

    if (comment.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar este comentário.' });
    }

    await comment.deleteOne();

    res.status(200).json({ message: 'Comentário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar comentário.', error: error.message });
  }
};

module.exports = { createComment, getCommentsByPost, deleteComment };
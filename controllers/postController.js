const Post = require("../models/Post");

// POST /api/posts
const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ message: "O conteúdo do post é obrigatório." });
    }

    const post = await Post.create({
      author: req.userId,
      content,
      image,
    });

    const populatedPost = await post.populate("author", "name avatar");

    res.status(201).json(populatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar post.", error: error.message });
  }
};

// GET /api/posts
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    res.status(200).json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar posts.", error: error.message });
  }
};

// GET /api/posts/:id
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name avatar",
    );

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar post.", error: error.message });
  }
};

// DELETE /api/posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    if (post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para deletar este post." });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deletado com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar post.", error: error.message });
  }
};

// POST /api/posts/:id/like
const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    const alreadyLiked = post.likes.some(
      (userId) => userId.toString() === req.userId,
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.userId,
      );
    } else {
      post.likes.push(req.userId);
    }

    await post.save();

    res.status(200).json({ likes: post.likes, totalLikes: post.likes.length });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao curtir/descurtir post.",
      error: error.message,
    });
  }
};

// PUT /api/posts/:id
const updatePost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ message: "O conteúdo do post é obrigatório." });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    if (post.author.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para editar este post." });
    }

    post.content = content;
    await post.save();

    const updatedPost = await post.populate("author", "name avatar");

    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao editar post.", error: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
};

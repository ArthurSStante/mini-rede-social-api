const User = require('../models/User');
const Post = require('../models/Post');

// GET /api/users/:id
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const posts = await Post.find({ author: req.params.id })
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil.', error: error.message });
  }
};

// PUT /api/users/me
const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil.', error: error.message });
  }
};

module.exports = { getUserProfile, updateProfile };
const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { getUserProfile, updateProfile } = require('../controllers/userController');

router.get('/:id', getUserProfile);
router.put('/me', protect, updateProfile);

module.exports = router;
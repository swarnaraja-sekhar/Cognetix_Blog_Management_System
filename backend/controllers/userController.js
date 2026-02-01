const User = require('../models/User');
const Blog = require('../models/Blog');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get blogs by a specific user
// @route   GET /api/users/:id/blogs
// @access  Public
const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.id }).populate('author', 'name');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, getUserBlogs };

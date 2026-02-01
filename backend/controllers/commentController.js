const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// @desc    Add a comment to a blog
// @route   POST /api/blogs/:blogId/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = await Comment.create({
      content: req.body.content,
      author: req.user.id,
      blog: req.params.blogId,
    });

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get comments for a blog
// @route   GET /api/blogs/:blogId/comments
// @access  Public
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate('author', 'name');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addComment,
  getComments,
};

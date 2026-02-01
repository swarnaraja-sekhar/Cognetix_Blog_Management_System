const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  clapBlog
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

// Re-route into other route handlers
router.use('/:blogId/comments', require('./commentRoutes'));

router.route('/').get(getBlogs).post(protect, createBlog);
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

router.route('/:id/clap').post(clapBlog);

module.exports = router;

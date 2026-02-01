const express = require('express');
const router = express.Router();
const { getUserProfile, getUserBlogs } = require('../controllers/userController');

// Route to get a user's profile information
router.get('/:id', getUserProfile);

// Route to get all blogs by a specific user
router.get('/:id/blogs', getUserBlogs);

module.exports = router;

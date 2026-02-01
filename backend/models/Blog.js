const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
        type: String,
        required: false 
    },
    category: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    claps: { type: Number, default: 0 }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Blog', blogSchema);

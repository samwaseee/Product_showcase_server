const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    slug: String,
    published: Boolean,
    author: String,
    content: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
    comments: [
      {
        user: String,
        content: String,
        votes: Number,
      },
    ],
  });  

module.exports = mongoose.model('products', productSchema);

const mongoose = require('mongoose');

const addToCart = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // ✅ Must be ObjectId for populate
    ref: 'Product',                       // ✅ Refers to product model
  },
  quantity: Number,
  userId: String,
}, {
  timestamps: true
});

const addToCartModel = mongoose.model("addToCart", addToCart);

module.exports = addToCartModel;

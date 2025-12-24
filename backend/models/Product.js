const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  image:       { type: String },
  // 🔹 NEW FIELD
  category:    { type: String, required: true }, 
  // e.g. "Laptops", "Mobiles", "Accessories"
});

module.exports = mongoose.model('Product', ProductSchema);

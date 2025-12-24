// backend/routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price image');
    res.json(cart ? cart.items : []);
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity) || 1; // default to 1

    if (!productId) {
      return res.status(400).json({ error: 'Product ID required.' });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    const index = cart.items.findIndex(i => i.product.toString() === productId);

    if (index >= 0) {
      cart.items[index].quantity += qty;
    } else {
      cart.items.push({ product: productId, quantity: qty });
    }

    await cart.save();

    // Populate product details before returning so client can render immediately
    await cart.populate('items.product', 'name price image');

    return res.json(cart.items);
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Remove from cart
router.post('/remove', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.json([]);

    cart.items = cart.items.filter(i => i.product.toString() !== productId);

    await cart.save();

    // Populate product details before returning
    await cart.populate('items.product', 'name price image');

    res.json(cart.items);
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

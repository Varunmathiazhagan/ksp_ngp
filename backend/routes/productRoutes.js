const express = require('express');
const router = express.Router();

// Mock product database (replace with real database in production)
const products = [
  {
    id: 1,
    name: "2/20(s) Black Yarn",
    description: "High-quality open-end yarn for various textile applications.",
    price: 7.99,
    image: "/images/20(s)Black.jpg",
    category: "Yarn",
    rating: 4.0,
  },
  {
    id: 2,
    name: "2/20(s) Red Yarn",
    description: "Premium ring spun yarn known for its softness and durability.",
    price: 9.99,
    image: "/images/20(s)Red.jpg",
    category: "Yarn",
    rating: 5.0,
  },
  // ... other products
];

// Get all products
router.get('/', (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Get single product by ID
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

module.exports = router;

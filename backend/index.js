const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5004;
const MONGO_URI = 'mongodb://localhost:27017/KSP_database';
const JWT_SECRET = '4953546c308be3088b28807c767bd35e99818434d130a588e5e6d90b6d1d326e';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  seedData(); // Call seedData function after successful connection
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit if database connection fails
});

// Add stats endpoint
app.get('/api/stats', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();
        res.json({
            users: userCount,
            products: productCount
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Error fetching statistics' });
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Seed data function
const seedData = async () => {
  try {
    // Check if products already exist
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log('Products already seeded');
      return;
    }

    // Sample product data
    const products = [
      {
        name: "Cotton Yarn - Natural White",
        description: "100% pure cotton yarn, perfect for knitting and crocheting",
        price: 12.99,
        image: "cotton_yarn_white.jpg",
        category: "Cotton",
        stock: 100
      },
      {
        name: "Merino Wool Yarn - Navy Blue",
        description: "Premium merino wool yarn, soft and warm",
        price: 24.99,
        image: "merino_yarn_blue.jpg",
        category: "Wool",
        stock: 75
      },
      {
        name: "Bamboo Blend Yarn - Sage Green",
        description: "Eco-friendly bamboo blend yarn with silky texture",
        price: 18.99,
        image: "bamboo_yarn_green.jpg",
        category: "Bamboo",
        stock: 50
      },
      {
        name: "Recycled Polyester Yarn - Charcoal",
        description: "Sustainable recycled polyester yarn",
        price: 15.99,
        image: "recycled_yarn_gray.jpg",
        category: "Synthetic",
        stock: 150
      },
      {
        name: "Organic Cotton Yarn - Pastel Pink",
        description: "GOTS certified organic cotton yarn",
        price: 16.99,
        image: "organic_yarn_pink.jpg",
        category: "Cotton",
        stock: 85
      }
    ];

    // Insert products
    await Product.insertMany(products);
    console.log('Sample products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

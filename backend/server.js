const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors({
  origin: ['https://cognetix-blog-management-system.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));

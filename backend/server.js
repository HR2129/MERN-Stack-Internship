import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sequelize, User, Post } from './models/index.js'; // Explicitly import index.js

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'your-secret-key';

// Initialize the database
sequelize.sync().then(() => {
  console.log('Database synced');
});

// Register a new user
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// Login a user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Define the /api/posts endpoint
app.post('/api/posts', authenticateToken, async (req, res) => {
  const { heading, description } = req.body;
  try {
    const post = await Post.create({ heading, description, userId: req.user.userId });
    res.status(201).json(post); // Return the created post
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
});

// Define the GET /api/posts endpoint
app.get('/api/posts', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.user.userId } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Define the DELETE /api/posts/:id endpoint
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.destroy({ where: { id, userId: req.user.userId } });
    if (result) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
});

// Define the PUT /api/posts/:id endpoint
app.put('/api/posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { heading, description } = req.body;
  try {
    const post = await Post.findOne({ where: { id, userId: req.user.userId } });
    if (post) {
      post.heading = heading;
      post.description = description;
      await post.save();
      res.json(post); // Return the updated post
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
});

// Get users (only for authenticated users)
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['username', 'email', 'password'] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
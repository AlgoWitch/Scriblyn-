import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// CORS configuration - allows requests from any origin
// For production, update FRONTEND_URL in .env to restrict to specific domain
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : '*', // Allow all origins in development
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
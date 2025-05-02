import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import Products from './Routes/ProductsRoutes.js';
import authRoutes from './Routes/AuthRoutes.js';
import paymentRoutes from './Routes/PaymentRoutes.js';

// Load environment variables before any other code
dotenv.config();

// Verify essential environment variables
const requiredEnvVars = ['MONGODB_URI', 'STRIPE_SECRET_KEY', 'FRONTEND_URL'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} is not defined in environment variables`);
  }
}

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded ({extended:true}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use("/Admin/AddProducts",Products);
app.use('/Images',express.static('Images'));
app.use('/', Products);
app.use("/Admin/ViewProducts",Products);
app.use('/Pages/', authRoutes);
app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from 'express';
import { createCheckoutSession } from '../Controllers/PaymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create checkout session
router.post('/create-checkout-session', protect, createCheckoutSession);

export default router; 
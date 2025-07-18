import express from 'express';
import { getMyOrders, createOrder, getAllOrders, updateOrderStatus } from '../Controllers/OrderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get current user's orders
router.get('/myorders', protect, getMyOrders);
// Create a new order (after payment)
router.post('/', protect, createOrder);
// Admin: get all orders
router.get('/', protect, getAllOrders);
// Admin: update delivery status
router.patch('/:id/status', protect, updateOrderStatus);

export default router; 
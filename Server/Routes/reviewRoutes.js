import express from 'express';
import { addReview, getProductReviews, deleteReview } from '../Controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// Add a review (protected route)
router.post('/', protect, addReview);

// Get reviews for a product
router.get('/product/:productId', getProductReviews);

// Delete a review (protected route)
router.delete('/:reviewId', protect, deleteReview);

export default router;
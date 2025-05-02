import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../Controllers/AuthController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/Signup', registerUser);
router.post('/Login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router; 
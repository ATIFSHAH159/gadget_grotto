import express from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers, updateUserRole, deleteUser } from '../Controllers/AuthController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/Signup', upload.single('image'), registerUser);
router.post('/Login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/all', protect, getAllUsers);
router.put('/role/:userId', protect, updateUserRole);
router.delete('/:userId', protect, deleteUser);

export default router; 
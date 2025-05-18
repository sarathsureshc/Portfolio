import express from 'express';
import {
  getProfile,
  getProfileById,
  createOrUpdateProfile,
} from '../controllers/profileController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProfile).post(protect, admin, createOrUpdateProfile);
router.route('/:id').get(protect, admin, getProfileById);

export default router;
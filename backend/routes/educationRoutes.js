import express from 'express';
import {
  getEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getEducations).post(protect, admin, createEducation);
router
  .route('/:id')
  .get(getEducationById)
  .put(protect, admin, updateEducation)
  .delete(protect, admin, deleteEducation);

export default router;
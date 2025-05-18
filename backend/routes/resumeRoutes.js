import express from 'express';
import { generateResume } from '../controllers/resumeController.js';

const router = express.Router();

router.get('/generate', generateResume);

export default router;
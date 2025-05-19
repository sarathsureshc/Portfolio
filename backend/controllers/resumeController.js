import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import asyncHandler from 'express-async-handler';

// @desc    Serve static resume PDF file
// @route   GET /api/resume/generate
// @access  Public
const generateResume = asyncHandler(async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const resumePath = path.join(__dirname, '../uploads/resume.pdf');

  if (!fs.existsSync(resumePath)) {
    res.status(404);
    throw new Error('Resume file not found');
  }

  res.download(resumePath, 'resume.pdf', (err) => {
    if (err) {
      res.status(500);
      throw new Error('Error downloading PDF');
    }
  });
});

export { generateResume };

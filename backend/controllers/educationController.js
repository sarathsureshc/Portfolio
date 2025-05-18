import asyncHandler from 'express-async-handler';
import Education from '../models/educationModel.js';

// @desc    Fetch all education
// @route   GET /api/education
// @access  Public
const getEducations = asyncHandler(async (req, res) => {
  const educations = await Education.find({}).sort({ order: 1 });
  res.json(educations);
});

// @desc    Fetch single education
// @route   GET /api/education/:id
// @access  Public
const getEducationById = asyncHandler(async (req, res) => {
  const education = await Education.findById(req.params.id);

  if (education) {
    res.json(education);
  } else {
    res.status(404);
    throw new Error('Education not found');
  }
});

// @desc    Create an education
// @route   POST /api/education
// @access  Private/Admin
const createEducation = asyncHandler(async (req, res) => {
  const { school, degree, fieldOfStudy, from, to, current, description, order } = req.body;

  const education = new Education({
    user: req.user._id,
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
    order,
  });

  const createdEducation = await education.save();
  res.status(201).json(createdEducation);
});

// @desc    Update an education
// @route   PUT /api/education/:id
// @access  Private/Admin
const updateEducation = asyncHandler(async (req, res) => {
  const { school, degree, fieldOfStudy, from, to, current, description, order } = req.body;

  const education = await Education.findById(req.params.id);

  if (education) {
    education.school = school;
    education.degree = degree;
    education.fieldOfStudy = fieldOfStudy;
    education.from = from;
    education.to = to;
    education.current = current;
    education.description = description;
    education.order = order;

    const updatedEducation = await education.save();
    res.json(updatedEducation);
  } else {
    res.status(404);
    throw new Error('Education not found');
  }
});

// @desc    Delete an education
// @route   DELETE /api/education/:id
// @access  Private/Admin
const deleteEducation = asyncHandler(async (req, res) => {
  const education = await Education.findById(req.params.id);

  if (education) {
    await education.deleteOne();
    res.json({ message: 'Education removed' });
  } else {
    res.status(404);
    throw new Error('Education not found');
  }
});

export {
  getEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
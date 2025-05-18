import asyncHandler from 'express-async-handler';
import Experience from '../models/experienceModel.js';

// @desc    Fetch all experiences
// @route   GET /api/experience
// @access  Public
const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find({}).sort({ order: 1 });
  res.json(experiences);
});

// @desc    Fetch single experience
// @route   GET /api/experience/:id
// @access  Public
const getExperienceById = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (experience) {
    res.json(experience);
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});

// @desc    Create an experience
// @route   POST /api/experience
// @access  Private/Admin
const createExperience = asyncHandler(async (req, res) => {
  const { title, company, location, from, to, current, description, order } = req.body;

  const experience = new Experience({
    user: req.user._id,
    title,
    company,
    location,
    from,
    to,
    current,
    description,
    order,
  });

  const createdExperience = await experience.save();
  res.status(201).json(createdExperience);
});

// @desc    Update an experience
// @route   PUT /api/experience/:id
// @access  Private/Admin
const updateExperience = asyncHandler(async (req, res) => {
  const { title, company, location, from, to, current, description, order } = req.body;

  const experience = await Experience.findById(req.params.id);

  if (experience) {
    experience.title = title;
    experience.company = company;
    experience.location = location;
    experience.from = from;
    experience.to = to;
    experience.current = current;
    experience.description = description;
    experience.order = order;

    const updatedExperience = await experience.save();
    res.json(updatedExperience);
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});

// @desc    Delete an experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (experience) {
    await experience.deleteOne();
    res.json({ message: 'Experience removed' });
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});

export {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
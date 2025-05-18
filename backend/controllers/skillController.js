import asyncHandler from 'express-async-handler';
import Skill from '../models/skillModel.js';

// @desc    Fetch all skills
// @route   GET /api/skills
// @access  Public
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({}).sort({ category: 1, order: 1 });
  res.json(skills);
});

// @desc    Fetch single skill
// @route   GET /api/skills/:id
// @access  Public
const getSkillById = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (skill) {
    res.json(skill);
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Admin
const createSkill = asyncHandler(async (req, res) => {
  const { name, level, category, icon, order } = req.body;

  const skill = new Skill({
    user: req.user._id,
    name,
    level,
    category,
    icon,
    order,
  });

  const createdSkill = await skill.save();
  res.status(201).json(createdSkill);
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
const updateSkill = asyncHandler(async (req, res) => {
  const { name, level, category, icon, order } = req.body;

  const skill = await Skill.findById(req.params.id);

  if (skill) {
    skill.name = name;
    skill.level = level;
    skill.category = category;
    skill.icon = icon;
    skill.order = order;

    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (skill) {
    await skill.deleteOne();
    res.json({ message: 'Skill removed' });
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

export {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
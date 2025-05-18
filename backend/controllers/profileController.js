import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne().sort({ createdAt: -1 });

  if (profile) {
    res.json(profile);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

// @desc    Get profile by ID
// @route   GET /api/profile/:id
// @access  Private/Admin
const getProfileById = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);

  if (profile) {
    res.json(profile);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

// @desc    Create or update profile
// @route   POST /api/profile
// @access  Private/Admin
const createOrUpdateProfile = asyncHandler(async (req, res) => {
  const {
    name,
    title,
    bio,
    avatar,
    location,
    phone,
    email,
    website,
    githubUsername,
    social,
  } = req.body;

  // Check if profile exists
  let profile = await Profile.findOne({ user: req.user._id });

  if (profile) {
    // Update profile
    profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: {
          name,
          title,
          bio,
          avatar,
          location,
          phone,
          email,
          website,
          githubUsername,
          social,
        },
      },
      { new: true }
    );

    return res.json(profile);
  }

  // Create profile
  profile = new Profile({
    user: req.user._id,
    name,
    title,
    bio,
    avatar,
    location,
    phone,
    email,
    website,
    githubUsername,
    social,
  });

  await profile.save();
  res.status(201).json(profile);
});

export { getProfile, getProfileById, createOrUpdateProfile };
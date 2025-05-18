import asyncHandler from 'express-async-handler';
import Project from '../models/projectModel.js';

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort({ order: 1 });
  res.json(projects);
});

// @desc    Fetch single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    image,
    technologies,
    githubUrl,
    liveUrl,
    featured,
    order,
  } = req.body;

  const project = new Project({
    user: req.user._id,
    title,
    description,
    image,
    technologies,
    githubUrl,
    liveUrl,
    featured,
    order,
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    image,
    technologies,
    githubUrl,
    liveUrl,
    featured,
    order,
  } = req.body;

  const project = await Project.findById(req.params.id);

  if (project) {
    project.title = title;
    project.description = description;
    project.image = image;
    project.technologies = technologies;
    project.githubUrl = githubUrl;
    project.liveUrl = liveUrl;
    project.featured = featured;
    project.order = order;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
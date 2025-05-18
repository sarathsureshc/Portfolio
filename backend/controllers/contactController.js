import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';

// @desc    Create a contact message
// @route   POST /api/contact
// @access  Public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  const contact = new Contact({
    name,
    email,
    subject,
    message,
  });

  const createdContact = await contact.save();
  res.status(201).json(createdContact);
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.json(contacts);
});

// @desc    Get contact by ID
// @route   GET /api/contact/:id
// @access  Private/Admin
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    // Mark as read if not already
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }
    res.json(contact);
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    await contact.deleteOne();
    res.json({ message: 'Contact removed' });
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});

export {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
};
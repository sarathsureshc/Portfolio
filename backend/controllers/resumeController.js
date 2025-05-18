import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import asyncHandler from 'express-async-handler';
import pdf from 'html-pdf';

// @desc    Generate resume PDF
// @route   GET /api/resume/generate
// @access  Public
const generateResume = asyncHandler(async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Read the HTML template
  const templatePath = path.join(__dirname, '../templates/resume.html');
  
  // Get profile data and other necessary data to fill the resume
  // This would typically come from your database
  // For simplicity, I'm just using placeholder data here
  const profileData = {
    name: 'Sarath Suresh C',
    title: 'MERN Stack Developer',
    email: 'email@example.com',
    phone: '+1234567890',
    location: 'City, Country',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript'],
    // Add other necessary data
  };
  
  let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
  
  // Replace placeholders with actual data
  htmlTemplate = htmlTemplate.replace('{{name}}', profileData.name);
  htmlTemplate = htmlTemplate.replace('{{title}}', profileData.title);
  htmlTemplate = htmlTemplate.replace('{{email}}', profileData.email);
  htmlTemplate = htmlTemplate.replace('{{phone}}', profileData.phone);
  htmlTemplate = htmlTemplate.replace('{{location}}', profileData.location);
  
  // Skills list
  const skillsHtml = profileData.skills.map(skill => `<li>${skill}</li>`).join('');
  htmlTemplate = htmlTemplate.replace('{{skills}}', skillsHtml);
  
  // Add other replacements as needed
  
  // Options for PDF generation
  const options = {
    format: 'Letter',
    orientation: 'portrait',
    border: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in',
    },
  };
  
  // Generate PDF
  const outputPath = path.join(__dirname, '../uploads/resume.pdf');
  
  pdf.create(htmlTemplate, options).toFile(outputPath, (err, result) => {
    if (err) {
      res.status(500);
      throw new Error('Error generating PDF');
    }
    
    res.download(outputPath, 'resume.pdf', (err) => {
      if (err) {
        res.status(500);
        throw new Error('Error downloading PDF');
      }
    });
  });
});

export { generateResume };
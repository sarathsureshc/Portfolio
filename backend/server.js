import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Route imports
import userRoutes from './routes/userRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

// Load env vars
dotenv.config();

const allowedOrigins = [
  'https://portfolio-oxyp8rmvf-sarathsureshcs-projects.vercel.app',
  'https://portfolio-bay-one-45.vercel.app',
  'https://portfolio-production-8966.up.railway.app',
  'http://localhost:3000/'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

app.use(cors(corsOptions));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/resume', resumeRoutes);

// Set static folder for uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const frontendBuildPath = path.resolve(__dirname, '../frontend/dist');
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

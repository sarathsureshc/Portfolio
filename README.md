# MERN Stack Portfolio Website

A fully dynamic, modern, professional, and responsive personal portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The portfolio features an admin dashboard for content management, allowing for easy addition, editing, and deletion of portfolio data.

## Features

- **Admin Authentication**: Secure login system for the portfolio owner
- **Content Management**: Admin dashboard to manage all aspects of the portfolio
- **Dynamic Content Sections**: About, Skills, Projects, Experience, Education
- **ATS-Friendly Resume**: Downloadable resume in PDF format
- **Contact Form**: For visitors to send messages
- **Dark/Light Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)

## Technology Stack

### Frontend
- React.js
- Redux Toolkit for state management
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- React Hook Form for form handling
- Axios for API requests
- React Helmet for SEO

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose for object modeling
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- HTML-PDF for resume generation

## Project Structure

```
portfolio-mern/
├── backend/              # Backend API
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── templates/        # Resume HTML template
│   ├── uploads/          # Uploaded files
│   └── server.js         # Entry point
│
├── frontend/             # React frontend
│   ├── public/           # Static files
│   └── src/
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       ├── slices/       # Redux slices
│       ├── App.jsx       # Main app component
│       └── main.jsx      # Entry point
│
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
└── README.md             # Project documentation
```
### Admin Dashboard
- Manage your profile information
- Add, edit, or delete projects
- Manage skills with categories and proficiency levels
- Add work experience and education history
- View and respond to contact messages

### Content Management
- **Profile**: Update your personal information, bio, and social links
- **Projects**: Showcase your work with descriptions, images, and links
- **Skills**: Organize your skills by category with proficiency levels
- **Experience**: Add your work history with detailed descriptions
- **Education**: Include your educational background
- **Messages**: View and manage messages from visitors

  ## Acknowledgements

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### Prerequisites
- Node.js (v14 or later)
- MongoDB account
- Git

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AdminProjects from './pages/admin/AdminProjects';
import AdminSkills from './pages/admin/AdminSkills';
import AdminExperience from './pages/admin/AdminExperience';
import AdminEducation from './pages/admin/AdminEducation';
import AdminContacts from './pages/admin/AdminContacts';
import PrivateRoute from './components/PrivateRoute';
import { loadUser } from './slices/authSlice';
import { Moon, Sun } from 'lucide-react';

const App = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    // Check if user is already logged in
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      dispatch(loadUser(JSON.parse(userInfo)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Apply theme class to html element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <button 
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="education" element={<AdminEducation />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
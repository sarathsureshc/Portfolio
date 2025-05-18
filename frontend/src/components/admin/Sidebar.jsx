import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  BarChart3, 
  MessageSquare,
  LogOut // Added logout icon
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice'; // Adjust path as needed

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
  };

  const sidebarItems = [
    {
      path: '/admin',
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: '/admin/profile',
      name: 'Profile',
      icon: <UserCircle size={20} />,
    },
    {
      path: '/admin/projects',
      name: 'Projects',
      icon: <Code2 size={20} />,
    },
    {
      path: '/admin/skills',
      name: 'Skills',
      icon: <BarChart3 size={20} />,
    },
    {
      path: '/admin/experience',
      name: 'Experience',
      icon: <Briefcase size={20} />,
    },
    {
      path: '/admin/education',
      name: 'Education',
      icon: <GraduationCap size={20} />,
    },
    {
      path: '/admin/contacts',
      name: 'Messages',
      icon: <MessageSquare size={20} />,
    },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h2>
      </div>
      
      <nav className="mt-5 flex-1">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-4 border-blue-500'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
        >
          <span className="mr-3">
            <LogOut size={20} />
          </span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
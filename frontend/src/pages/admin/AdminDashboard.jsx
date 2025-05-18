import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjects } from '../../slices/projectSlice';
import { getSkills } from '../../slices/skillSlice';
import { getExperiences } from '../../slices/experienceSlice';
import { getEducations } from '../../slices/educationSlice';
import { getContacts } from '../../slices/contactSlice';
import Sidebar from '../../components/admin/Sidebar';
import DashboardCard from '../../components/admin/DashboardCard';
import Meta from '../../components/Meta';
import Loader from '../../components/Loader';
import { Code2, BarChart3, Briefcase, GraduationCap, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { projects, loading: projectsLoading } = useSelector((state) => state.projects);
  const { skills, loading: skillsLoading } = useSelector((state) => state.skills);
  const { experiences, loading: experiencesLoading } = useSelector((state) => state.experiences);
  const { educations, loading: educationsLoading } = useSelector((state) => state.education);
  const { contacts, loading: contactsLoading } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getSkills());
    dispatch(getExperiences());
    dispatch(getEducations());
    dispatch(getContacts());
  }, [dispatch]);

  const isLoading = projectsLoading || skillsLoading || experiencesLoading || educationsLoading || contactsLoading;

  const unreadMessages = contacts ? contacts.filter(contact => !contact.isRead).length : 0;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Meta title="Admin Dashboard | Sarath Suresh C" />
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Welcome back, {userInfo.name}
              </p>
            </div>
            
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <DashboardCard 
                title="Projects"
                count={projects ? projects.length : 0}
                icon={<Code2 size={24} className="text-blue-600 dark:text-blue-400" />}
                path="/admin/projects"
                color="blue"
              />
              <DashboardCard 
                title="Skills"
                count={skills ? skills.length : 0}
                icon={<BarChart3 size={24} className="text-green-600 dark:text-green-400" />}
                path="/admin/skills"
                color="green"
              />
              <DashboardCard 
                title="Experience"
                count={experiences ? experiences.length : 0}
                icon={<Briefcase size={24} className="text-purple-600 dark:text-purple-400" />}
                path="/admin/experience"
                color="purple"
              />
              <DashboardCard 
                title="Education"
                count={educations ? educations.length : 0}
                icon={<GraduationCap size={24} className="text-orange-600 dark:text-orange-400" />}
                path="/admin/education"
                color="orange"
              />
              <DashboardCard 
                title="Messages"
                count={contacts ? contacts.length : 0}
                icon={<MessageSquare size={24} className="text-teal-600 dark:text-teal-400" />}
                path="/admin/contacts"
                color="teal"
              />
            </div>
            
            {/* Recent Messages */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Messages
                  {unreadMessages > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {unreadMessages} new
                    </span>
                  )}
                </h2>
                <Link 
                  to="/admin/contacts" 
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  View all
                </Link>
              </div>
              
              {contacts && contacts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Subject
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {contacts.slice(0, 5).map((contact) => (
                        <tr key={contact._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {contact.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {contact.subject}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span 
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                contact.isRead 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              }`}
                            >
                              {contact.isRead ? 'Read' : 'Unread'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300 text-center py-4">
                  No messages found
                </p>
              )}
            </div>
            
            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Quick Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  to="/admin/profile" 
                  className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex flex-col items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">Update Profile</span>
                </Link>
                <Link 
                  to="/admin/projects" 
                  className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg flex flex-col items-center justify-center hover:bg-green-100 dark:hover:bg-green-800/40 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">Add New Project</span>
                </Link>
                <Link 
                  to="/admin/skills" 
                  className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg flex flex-col items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-800/40 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">Manage Skills</span>
                </Link>
                <a 
                  href="/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg flex flex-col items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-800/40 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">View Portfolio</span>
                </a>
                <Link 
                  to="/resume" 
                  className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg flex flex-col items-center justify-center hover:bg-teal-100 dark:hover:bg-teal-800/40 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">View Resume</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
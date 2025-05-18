import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ExternalLink, ArrowRight } from 'lucide-react';
import { getProfile } from '../slices/profileSlice';
import { getProjects } from '../slices/projectSlice';
import { getSkills } from '../slices/skillSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import ProjectCard from '../components/ProjectCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { profile, loading: profileLoading } = useSelector((state) => state.profile);
  const { projects, loading: projectsLoading } = useSelector((state) => state.projects);
  const { skills, loading: skillsLoading } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getProjects());
    dispatch(getSkills());
  }, [dispatch]);

  const featuredProjects = projects ? projects.filter(project => project.featured).slice(0, 3) : [];
  const frontendSkills = skills ? skills.filter(skill => skill.category === 'Frontend').slice(0, 5) : [];
  const backendSkills = skills ? skills.filter(skill => skill.category === 'Backend').slice(0, 5) : [];

  if (profileLoading || projectsLoading || skillsLoading) {
    return <Loader />;
  }

  const heroImage = profile && profile.avatar ? profile.avatar : 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <>
      <Meta />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  <span className="block">Hi, I'm {profile ? profile.name : 'Sarath Suresh C'}</span>
                  <span className="text-blue-600 dark:text-blue-400">MERN Stack Developer</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  {profile ? profile.bio : 'Creating elegant, efficient, and user-friendly web applications with modern technologies like React, Node.js, Express, and MongoDB.'}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-primary">
                    Get in Touch
                  </Link>
                  <Link to="/projects" className="btn-outline">
                    View Projects
                  </Link>
                </div>
                <div className="flex mt-8 space-x-5">
                  {profile && profile.social && profile.social.github && (
                    <a 
                      href={profile.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
                    >
                      <Github size={22} />
                    </a>
                  )}
                  {profile && profile.social && profile.social.linkedin && (
                    <a 
                      href={profile.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
                    >
                      <Linkedin size={22} />
                    </a>
                  )}
                  {profile && profile.social && profile.social.twitter && (
                    <a 
                      href={profile.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
                    >
                      <Twitter size={22} />
                    </a>
                  )}
                </div>
              </motion.div>
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur opacity-30"></div>
                  <img 
                    src={heroImage} 
                    alt={profile ? profile.name : 'Sarath Suresh C'} 
                    className="relative rounded-full shadow-xl border-4 border-white dark:border-gray-800 w-64 h-64 md:w-80 md:h-80 object-cover mx-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Projects Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Featured Projects
              </h2>
              <Link 
                to="/projects" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center transition-colors duration-300"
              >
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {featuredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300 py-10">
                No featured projects yet. Check back soon!
              </p>
            )}
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
              My Skills
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Frontend Skills */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Front-end Technologies</h3>
                <div className="space-y-4">
                  {frontendSkills.map((skill) => (
                    <div key={skill._id} className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-sm font-semibold inline-block text-gray-800 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-300">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-gray-700">
                        <motion.div 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/about" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center mt-4 transition-colors duration-300"
                >
                  View All Skills <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              {/* Backend Skills */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Back-end Technologies</h3>
                <div className="space-y-4">
                  {backendSkills.map((skill) => (
                    <div key={skill._id} className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-sm font-semibold inline-block text-gray-800 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-300">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200 dark:bg-gray-700">
                        <motion.div 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/about" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center mt-4 transition-colors duration-300"
                >
                  View All Skills <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to start your project?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10">
              I'm currently available for freelance work. If you have a project that needs some creative work, I'd love to hear about it.
            </p>
            <Link to="/contact" className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
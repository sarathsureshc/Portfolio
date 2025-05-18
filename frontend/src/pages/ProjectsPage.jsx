import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getProjects } from '../slices/projectSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  const featuredProjects = projects ? projects.filter(project => project.featured) : [];
  const otherProjects = projects ? projects.filter(project => !project.featured) : [];

  return (
    <>
      <Meta title="Projects | Sarath Suresh C - MERN Stack Developer" />
      <Header />
      <main>
        {/* Hero Section */}
        <motion.section 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore a collection of my recent work showcasing my skills in MERN stack development.
              Each project represents a unique challenge and solution.
            </p>
          </div>
        </motion.section>
        
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="py-16 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
                Featured Projects
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Other Projects */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
              {featuredProjects.length > 0 ? 'Other Projects' : 'All Projects'}
            </h2>
            
            {otherProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300 py-10">
                {projects && projects.length > 0 
                  ? 'No other projects available at this time.'
                  : 'No projects available at this time. Check back soon!'}
              </p>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Have a project in mind?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10">
              I'm always open to discussing new projects and opportunities. Let's create something amazing together.
            </p>
            <a href="/contact" className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Get in Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProjectsPage;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getProfile } from '../slices/profileSlice';
import { getSkills } from '../slices/skillSlice';
import { getExperiences } from '../slices/experienceSlice';
import { getEducations } from '../slices/educationSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import SkillCard from '../components/SkillCard';
import ExperienceCard from '../components/ExperienceCard';
import EducationCard from '../components/EducationCard';
import { Download, MapPin, Mail, Globe, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const AboutPage = () => {
  const dispatch = useDispatch();
  const { profile, loading: profileLoading } = useSelector((state) => state.profile);
  const { skills, loading: skillsLoading } = useSelector((state) => state.skills);
  const { experiences, loading: experiencesLoading } = useSelector((state) => state.experiences);
  const { educations, loading: educationsLoading } = useSelector((state) => state.education);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getSkills());
    dispatch(getExperiences());
    dispatch(getEducations());
  }, [dispatch]);

  const isLoading = profileLoading || skillsLoading || experiencesLoading || educationsLoading;

  if (isLoading) {
    return <Loader />;
  }

  const skillCategories = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Other',
  ];

  const avatarImage = profile && profile.avatar ? profile.avatar : 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <>
      <Meta title="About | Sarath Suresh C - MERN Stack Developer" />
      <Header />
      <main>
        {/* Bio Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                className="lg:w-1/3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur opacity-30"></div>
                  <img 
                    src={avatarImage} 
                    alt={profile ? profile.name : 'Sarath Suresh C'} 
                    className="relative rounded-full shadow-xl border-4 border-white dark:border-gray-800 w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.div 
                className="lg:w-2/3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  About Me
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
                  {profile ? profile.title : 'MERN Stack Developer'}
                </h2>
                <div className="text-gray-600 dark:text-gray-300 mb-8 space-y-4">
                  <p>{profile ? profile.bio : 'Experienced MERN Stack Developer with a passion for creating efficient, scalable, and user-friendly web applications.'}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {profile && profile.location && (
                    <div className="flex items-center">
                      <MapPin size={18} className="text-blue-500 mr-2" />
                      <span className="text-gray-600 dark:text-gray-300">{profile.location}</span>
                    </div>
                  )}
                  {profile && profile.email && (
                    <div className="flex items-center">
                      <Mail size={18} className="text-blue-500 mr-2" />
                      <a href={`mailto:${profile.email}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
                        {profile.email}
                      </a>
                    </div>
                  )}
                  {profile && profile.website && (
                    <div className="flex items-center">
                      <Globe size={18} className="text-blue-500 mr-2" />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
                        {profile.website.replace(/(^\w+:|^)\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-5 mb-8">
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
                  {profile && profile.social && profile.social.instagram && (
                    <a 
                      href={profile.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
                    >
                      <Instagram size={22} />
                    </a>
                  )}
                </div>
                
                <a 
                  href="/api/resume/generate" 
                  className="btn-primary flex items-center max-w-fit"
                >
                  <Download size={16} className="mr-2" /> Download Resume
                </a>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-16">
                My Skills
              </h2>
              
              {skillCategories.map((category) => {
                const categorySkills = skills.filter(skill => skill.category === category);
                
                return categorySkills.length > 0 ? (
                  <div key={category} className="mb-16 last:mb-0">
                    <h3 className="text-xl font-semibold mb-8 text-gray-800 dark:text-white">
                      {category} Technologies
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {categorySkills.map((skill) => (
                        <SkillCard key={skill._id} skill={skill} />
                      ))}
                    </div>
                  </div>
                ) : null;
              })}
            </motion.div>
          </div>
        </section>
        
        {/* Experience Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-16">
                Work Experience
              </h2>
              
              <div className="max-w-3xl mx-auto">
                {experiences && experiences.length > 0 ? (
                  experiences.map((experience) => (
                    <ExperienceCard key={experience._id} experience={experience} />
                  ))
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    No experience data available.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Education Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-16">
                Education
              </h2>
              
              <div className="max-w-3xl mx-auto">
                {educations && educations.length > 0 ? (
                  educations.map((education) => (
                    <EducationCard key={education._id} education={education} />
                  ))
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    No education data available.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
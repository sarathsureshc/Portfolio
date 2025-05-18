import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ExperienceCard = ({ experience }) => {
  // Format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div 
      className="relative pl-8 py-6 border-l-2 border-blue-500 dark:border-blue-400"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -left-4 mt-1 bg-white dark:bg-gray-800 p-2 rounded-full border-2 border-blue-500 dark:border-blue-400">
        <Briefcase size={20} className="text-blue-500 dark:text-blue-400" />
      </div>
      
      <div className="mb-1">
        <span className="px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
          {formatDate(experience.from)} - {experience.current ? 'Present' : formatDate(experience.to)}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mt-2">{experience.title}</h3>
      <h4 className="text-lg text-gray-600 dark:text-gray-300 font-medium">
        {experience.company} {experience.location && `• ${experience.location}`}
      </h4>
      
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        {experience.description}
      </p>
    </motion.div>
  );
};

export default ExperienceCard;
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const EducationCard = ({ education }) => {
  // Format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div 
      className="relative pl-8 py-6 border-l-2 border-teal-500 dark:border-teal-400"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -left-4 mt-1 bg-white dark:bg-gray-800 p-2 rounded-full border-2 border-teal-500 dark:border-teal-400">
        <GraduationCap size={20} className="text-teal-500 dark:text-teal-400" />
      </div>
      
      <div className="mb-1">
        <span className="px-2 py-1 text-xs font-semibold bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 rounded-full">
          {formatDate(education.from)} - {education.current ? 'Present' : formatDate(education.to)}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mt-2">{education.degree}</h3>
      <h4 className="text-lg text-gray-600 dark:text-gray-300 font-medium">
        {education.school} • {education.fieldOfStudy}
      </h4>
      
      {education.description && (
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          {education.description}
        </p>
      )}
    </motion.div>
  );
};

export default EducationCard;
import React from 'react';
import { motion } from 'framer-motion';

const SkillCard = ({ skill }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-2 text-center">
        {skill.icon ? (
          <img src={skill.icon} alt={skill.name} className="h-12 w-12 mx-auto" />
        ) : (
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
            <span className="text-blue-600 dark:text-blue-300 font-bold">{skill.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-center mb-2">{skill.name}</h3>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-200">
              {skill.category}
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
    </motion.div>
  );
};

export default SkillCard;
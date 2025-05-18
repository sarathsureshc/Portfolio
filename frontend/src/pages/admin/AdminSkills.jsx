import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  resetSuccess,
  clearSkill,
} from '../../slices/skillSlice';
import Sidebar from '../../components/admin/Sidebar';
import Meta from '../../components/Meta';
import Loader from '../../components/Loader';
import { PlusCircle, Edit, Trash2, X, Save } from 'lucide-react';

const AdminSkills = () => {
  const dispatch = useDispatch();
  const { skills, skill, loading, success } = useSelector((state) => state.skills);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setShowForm(false);
      setIsEditing(false);
      dispatch(resetSuccess());
      dispatch(clearSkill());
      reset();
    }
  }, [success, dispatch, reset]);

  useEffect(() => {
    if (skill) {
      setValue('name', skill.name);
      setValue('level', skill.level);
      setValue('category', skill.category);
      setValue('icon', skill.icon);
      setValue('order', skill.order);
    }
  }, [skill, setValue]);

  const handleAddSkill = () => {
    dispatch(clearSkill());
    reset();
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditSkill = (id) => {
    dispatch(getSkillById(id));
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteConfirm = (id) => {
    setConfirmDelete(id);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
    setConfirmDelete(null);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setIsEditing(false);
    dispatch(clearSkill());
    reset();
  };

  const onSubmit = (data) => {
    if (isEditing) {
      dispatch(updateSkill({ id: skill._id, skillData: data }));
    } else {
      dispatch(createSkill(data));
    }
  };

  // Group skills by category
  const groupedSkills = skills ? skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {}) : {};

  return (
    <>
      <Meta title="Skills Management | Admin Dashboard" />
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skills Management</h1>
              <button
                onClick={handleAddSkill}
                className="btn-primary flex items-center"
              >
                <PlusCircle size={18} className="mr-2" /> Add Skill
              </button>
            </div>
            
            {showForm ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isEditing ? 'Edit Skill' : 'Add New Skill'}
                  </h2>
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className={`form-input ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                        {...register('name', { required: 'Skill name is required' })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Skill Level (1-100)
                      </label>
                      <input
                        type="number"
                        id="level"
                        min="1"
                        max="100"
                        className={`form-input ${errors.level ? 'border-red-500 dark:border-red-500' : ''}`}
                        {...register('level', { 
                          required: 'Skill level is required',
                          valueAsNumber: true,
                          min: {
                            value: 1,
                            message: 'Level must be at least 1'
                          },
                          max: {
                            value: 100,
                            message: 'Level must be at most 100'
                          }
                        })}
                      />
                      {errors.level && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.level.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        className={`form-select ${errors.category ? 'border-red-500 dark:border-red-500' : ''}`}
                        {...register('category', { required: 'Category is required' })}
                      >
                        <option value="">Select a category</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Icon URL (optional)
                      </label>
                      <input
                        type="text"
                        id="icon"
                        className="form-input"
                        placeholder="https://example.com/icon.svg"
                        {...register('icon')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        id="order"
                        className="form-input"
                        defaultValue={0}
                        {...register('order', { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="btn-primary flex items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} className="mr-2" /> {isEditing ? 'Update Skill' : 'Save Skill'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
            
            {loading && !showForm ? (
              <Loader />
            ) : (
              <div className="space-y-8">
                {Object.keys(groupedSkills).map((category) => (
                  <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Skill
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Level
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Order
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {groupedSkills[category].map((skill) => (
                            <tr key={skill._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {skill.icon ? (
                                    <div className="flex-shrink-0 h-8 w-8">
                                      <img
                                        className="h-8 w-8 object-contain"
                                        src={skill.icon}
                                        alt={skill.name}
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex-shrink-0 h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                      <span className="text-blue-600 dark:text-blue-300 font-bold">
                                        {skill.name.charAt(0)}
                                      </span>
                                    </div>
                                  )}
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {skill.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                  <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${skill.level}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 inline-block">
                                  {skill.level}%
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {skill.order}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleEditSkill(skill._id)}
                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                                  >
                                    <Edit size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteConfirm(skill._id)}
                                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
                
                {Object.keys(groupedSkills).length === 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      No skills found. Add a new skill to get started.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {confirmDelete && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Confirm Delete
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Are you sure you want to delete this skill? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleDeleteCancel}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(confirmDelete)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminSkills;
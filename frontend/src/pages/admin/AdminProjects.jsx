import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  resetSuccess,
  clearProject,
} from '../../slices/projectSlice';
import Sidebar from '../../components/admin/Sidebar';
import Meta from '../../components/Meta';
import Loader from '../../components/Loader';
import { PlusCircle, Edit, Trash2, X, Save } from 'lucide-react';

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { projects, project, loading, success } = useSelector((state) => state.projects);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [tech, setTech] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setShowForm(false);
      setIsEditing(false);
      dispatch(resetSuccess());
      dispatch(clearProject());
      reset();
      setTechnologies([]);
    }
  }, [success, dispatch, reset]);

  useEffect(() => {
    if (project) {
      setValue('title', project.title);
      setValue('description', project.description);
      setValue('image', project.image);
      setValue('githubUrl', project.githubUrl);
      setValue('liveUrl', project.liveUrl);
      setValue('featured', project.featured);
      setValue('order', project.order);
      setTechnologies(project.technologies || []);
    }
  }, [project, setValue]);

  const handleAddProject = () => {
    dispatch(clearProject());
    reset();
    setTechnologies([]);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditProject = (id) => {
    dispatch(getProjectById(id));
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteConfirm = (id) => {
    setConfirmDelete(id);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
    setConfirmDelete(null);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setIsEditing(false);
    dispatch(clearProject());
    reset();
    setTechnologies([]);
  };

  const addTechnology = () => {
    if (tech.trim() !== '' && !technologies.includes(tech.trim())) {
      setTechnologies([...technologies, tech.trim()]);
      setTech('');
    }
  };

  const removeTechnology = (index) => {
    const newTechnologies = [...technologies];
    newTechnologies.splice(index, 1);
    setTechnologies(newTechnologies);
  };

  const onSubmit = (data) => {
    const projectData = {
      ...data,
      technologies,
    };
    
    if (isEditing) {
      dispatch(updateProject({ id: project._id, projectData }));
    } else {
      dispatch(createProject(projectData));
    }
  };

  return (
    <>
      <Meta title="Projects Management | Admin Dashboard" />
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects Management</h1>
              <button
                onClick={handleAddProject}
                className="btn-primary flex items-center"
              >
                <PlusCircle size={18} className="mr-2" /> Add Project
              </button>
            </div>
            
            {showForm ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isEditing ? 'Edit Project' : 'Add New Project'}
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
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className={`form-input ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                        {...register('title', { required: 'Project title is required' })}
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        id="image"
                        className="form-input"
                        placeholder="https://example.com/image.jpg"
                        {...register('image')}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows={4}
                        className={`form-textarea ${errors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                        {...register('description', { required: 'Description is required' })}
                      ></textarea>
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="text"
                        id="githubUrl"
                        className="form-input"
                        placeholder="https://github.com/username/repo"
                        {...register('githubUrl')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Live URL
                      </label>
                      <input
                        type="text"
                        id="liveUrl"
                        className="form-input"
                        placeholder="https://example.com"
                        {...register('liveUrl')}
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
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        className="form-checkbox"
                        {...register('featured')}
                      />
                      <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Featured Project
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Technologies
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="form-input flex-1"
                        placeholder="Add technology (e.g., React)"
                        value={tech}
                        onChange={(e) => setTech(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      />
                      <button
                        type="button"
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={addTechnology}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap mt-2 gap-2">
                      {technologies.map((tech, index) => (
                        <div key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm flex items-center">
                          {tech}
                          <button
                            type="button"
                            className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                            onClick={() => removeTechnology(index)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
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
                          <Save size={18} className="mr-2" /> {isEditing ? 'Update Project' : 'Save Project'}
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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Project
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Technologies
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
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
                      {projects && projects.length > 0 ? (
                        projects.map((project) => (
                          <tr key={project._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={project.image || 'https://via.placeholder.com/150'}
                                    alt={project.title}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {project.title}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {project.technologies && project.technologies.length > 0 ? (
                                  project.technologies.slice(0, 3).map((tech, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                                    >
                                      {tech}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-gray-500 dark:text-gray-400 text-sm">No technologies</span>
                                )}
                                {project.technologies && project.technologies.length > 3 && (
                                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                                    +{project.technologies.length - 3}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span 
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  project.featured 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                }`}
                              >
                                {project.featured ? 'Featured' : 'Regular'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {project.order}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleEditProject(project._id)}
                                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteConfirm(project._id)}
                                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                            No projects found. Add a new project to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
                    Are you sure you want to delete this project? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleDeleteCancel}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteProject(confirmDelete)}
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

export default AdminProjects;
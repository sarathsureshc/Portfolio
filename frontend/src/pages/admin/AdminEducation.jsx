import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  getEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
  resetSuccess,
  clearEducation,
} from '../../slices/educationSlice';
import Sidebar from '../../components/admin/Sidebar';
import Meta from '../../components/Meta';
import Loader from '../../components/Loader';
import { PlusCircle, Edit, Trash2, X, Save } from 'lucide-react';

const AdminEducation = () => {
  const dispatch = useDispatch();
  const { educations, education, loading, success } = useSelector((state) => state.education);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [currentEducation, setCurrentEducation] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const watchCurrentEducation = watch('current', false);

  useEffect(() => {
    dispatch(getEducations());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setShowForm(false);
      setIsEditing(false);
      dispatch(resetSuccess());
      dispatch(clearEducation());
      reset();
      setFromDate(null);
      setToDate(null);
      setCurrentEducation(false);
    }
  }, [success, dispatch, reset]);

  useEffect(() => {
    if (education) {
      setValue('school', education.school);
      setValue('degree', education.degree);
      setValue('fieldOfStudy', education.fieldOfStudy);
      setValue('current', education.current);
      setValue('description', education.description);
      setValue('order', education.order);
      
      setFromDate(education.from ? new Date(education.from) : null);
      setToDate(education.to ? new Date(education.to) : null);
      setCurrentEducation(education.current);
    }
  }, [education, setValue]);

  useEffect(() => {
    setCurrentEducation(watchCurrentEducation);
  }, [watchCurrentEducation]);

  const handleAddEducation = () => {
    dispatch(clearEducation());
    reset();
    setFromDate(null);
    setToDate(null);
    setCurrentEducation(false);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditEducation = (id) => {
    dispatch(getEducationById(id));
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteConfirm = (id) => {
    setConfirmDelete(id);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  const handleDeleteEducation = (id) => {
    dispatch(deleteEducation(id));
    setConfirmDelete(null);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setIsEditing(false);
    dispatch(clearEducation());
    reset();
    setFromDate(null);
    setToDate(null);
    setCurrentEducation(false);
  };

  const onSubmit = (data) => {
    const educationData = {
      ...data,
      from: fromDate,
      to: currentEducation ? null : toDate,
    };
    
    if (isEditing) {
      dispatch(updateEducation({ id: education._id, educationData }));
    } else {
      dispatch(createEducation(educationData));
    }
  };

  // Format date to display in the table
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Sort educations by date (most recent first)
  const sortedEducations = educations ? [...educations].sort((a, b) => {
    return new Date(b.from) - new Date(a.from);
  }) : [];

  return (
    <>
      <Meta title="Education Management | Admin Dashboard" />
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Education Management</h1>
              <button
                onClick={handleAddEducation}
                className="btn-primary flex items-center"
              >
                <PlusCircle size={18} className="mr-2" /> Add Education
              </button>
            </div>
            
            {showForm ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isEditing ? 'Edit Education' : 'Add New Education'}
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
                      <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        School/University
                      </label>
                      <input
                        type="text"
                        id="school"
                        className={`form-input ${errors.school ? 'border-red-500 dark:border-red-500' : ''}`}
                        {...register('school', { required: 'School/University is required' })}
                      />
                      {errors.school && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.school.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="degree" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        id="degree"
                        className={`form-input ${errors.degree ? 'border-red-500 dark:border-red-500' : ''}`}
                        {...register('degree', { required: 'Degree is required' })}
                      />
                      {errors.degree && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.degree.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        id="fieldOfStudy"
                        className={`form-input ${errors.fieldOfStudy ? 'border-red-500 dark:border-red-500' : ''}`}
                        {...register('fieldOfStudy', { required: 'Field of study is required' })}
                      />
                      {errors.fieldOfStudy && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fieldOfStudy.message}</p>
                      )}
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
                    
                    <div>
                      <label htmlFor="from" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date
                      </label>
                      <DatePicker
                        selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                        className={`form-input w-full ${!fromDate ? 'border-red-500 dark:border-red-500' : ''}`}
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        placeholderText="Select start date"
                      />
                      {!fromDate && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">Start date is required</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <DatePicker
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        className={`form-input w-full ${currentEducation ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : ''}`}
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        placeholderText="Select end date"
                        disabled={currentEducation}
                        minDate={fromDate}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 md:col-span-2">
                      <input
                        type="checkbox"
                        id="current"
                        className="form-checkbox"
                        {...register('current')}
                      />
                      <label htmlFor="current" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        I am currently studying here
                      </label>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description (optional)
                      </label>
                      <textarea
                        id="description"
                        rows={4}
                        className="form-textarea"
                        {...register('description')}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="btn-primary flex items-center"
                      disabled={loading || !fromDate || (!toDate && !currentEducation)}
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
                          <Save size={18} className="mr-2" /> {isEditing ? 'Update Education' : 'Save Education'}
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
                          School/University
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Degree
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Field of Study
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Duration
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
                      {sortedEducations.length > 0 ? (
                        sortedEducations.map((edu) => (
                          <tr key={edu._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {edu.school}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                {edu.degree}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                {edu.fieldOfStudy}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                {formatDate(edu.from)} - {edu.current ? 'Present' : formatDate(edu.to)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {edu.order}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleEditEducation(edu._id)}
                                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteConfirm(edu._id)}
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
                          <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                            No education entries found. Add new education to get started.
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
                    Are you sure you want to delete this education entry? This action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleDeleteCancel}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(confirmDelete)}
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

export default AdminEducation;
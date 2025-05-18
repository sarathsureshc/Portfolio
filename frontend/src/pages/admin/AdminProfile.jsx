import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getProfile, createOrUpdateProfile, resetSuccess } from '../../slices/profileSlice';
import Sidebar from '../../components/admin/Sidebar';
import Meta from '../../components/Meta';
import Loader from '../../components/Loader';
import { Save } from 'lucide-react';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, success } = useSelector((state) => state.profile);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        title: profile.title || '',
        bio: profile.bio || '',
        avatar: profile.avatar || '',
        location: profile.location || '',
        phone: profile.phone || '',
        email: profile.email || '',
        website: profile.website || '',
        githubUsername: profile.githubUsername || '',
        'social.github': profile.social?.github || '',
        'social.linkedin': profile.social?.linkedin || '',
        'social.twitter': profile.social?.twitter || '',
        'social.instagram': profile.social?.instagram || '',
      });
    }
  }, [profile, reset]);

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        dispatch(resetSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const onSubmit = (data) => {
    const profileData = {
      ...data,
      social: {
        github: data['social.github'],
        linkedin: data['social.linkedin'],
        twitter: data['social.twitter'],
        instagram: data['social.instagram'],
      },
    };
    
    // Remove social properties from the root object
    delete profileData['social.github'];
    delete profileData['social.linkedin'];
    delete profileData['social.twitter'];
    delete profileData['social.instagram'];
    
    dispatch(createOrUpdateProfile(profileData));
  };

  return (
    <>
      <Meta title="Profile Management | Admin Dashboard" />
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Management</h1>
            </div>
            
            {showSuccessMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 dark:bg-green-900 dark:text-green-100 dark:border-green-700" role="alert">
                <span className="block sm:inline">Profile updated successfully!</span>
              </div>
            )}
            
            {loading ? (
              <Loader />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Basic Information
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className={`form-input ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                            {...register('name', { required: 'Name is required' })}
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Professional Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            className={`form-input ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                            {...register('title', { required: 'Professional title is required' })}
                          />
                          {errors.title && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            rows={5}
                            className={`form-textarea ${errors.bio ? 'border-red-500 dark:border-red-500' : ''}`}
                            {...register('bio', { required: 'Bio is required' })}
                          ></textarea>
                          {errors.bio && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.bio.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Avatar URL
                          </label>
                          <input
                            type="text"
                            id="avatar"
                            className="form-input"
                            placeholder="https://example.com/avatar.jpg"
                            {...register('avatar')}
                          />
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Enter a URL for your profile image
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Contact Information
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            className="form-input"
                            placeholder="City, Country"
                            {...register('location')}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone
                          </label>
                          <input
                            type="text"
                            id="phone"
                            className="form-input"
                            placeholder="+1 (123) 456-7890"
                            {...register('phone')}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className={`form-input ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                            placeholder="your.email@example.com"
                            {...register('email', { 
                              required: 'Email is required',
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Please enter a valid email address'
                              }
                            })}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Website
                          </label>
                          <input
                            type="text"
                            id="website"
                            className="form-input"
                            placeholder="https://yourwebsite.com"
                            {...register('website')}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="githubUsername" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            GitHub Username
                          </label>
                          <input
                            type="text"
                            id="githubUsername"
                            className="form-input"
                            placeholder="username"
                            {...register('githubUsername')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Media */}
                  <div className="pt-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Social Media
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="social.github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          GitHub URL
                        </label>
                        <input
                          type="text"
                          id="social.github"
                          className="form-input"
                          placeholder="https://github.com/username"
                          {...register('social.github')}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="social.linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          LinkedIn URL
                        </label>
                        <input
                          type="text"
                          id="social.linkedin"
                          className="form-input"
                          placeholder="https://linkedin.com/in/username"
                          {...register('social.linkedin')}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="social.twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Twitter URL
                        </label>
                        <input
                          type="text"
                          id="social.twitter"
                          className="form-input"
                          placeholder="https://twitter.com/username"
                          {...register('social.twitter')}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="social.instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Instagram URL
                        </label>
                        <input
                          type="text"
                          id="social.instagram"
                          className="form-input"
                          placeholder="https://instagram.com/username"
                          {...register('social.instagram')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
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
                          <Save size={18} className="mr-2" /> Save Profile
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
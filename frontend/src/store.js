import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import projectReducer from './slices/projectSlice';
import skillReducer from './slices/skillSlice';
import experienceReducer from './slices/experienceSlice';
import educationReducer from './slices/educationSlice';
import contactReducer from './slices/contactSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    projects: projectReducer,
    skills: skillReducer,
    experiences: experienceReducer,
    education: educationReducer,
    contacts: contactReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
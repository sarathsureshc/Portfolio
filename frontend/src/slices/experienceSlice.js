import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

// Get all experiences
export const getExperiences = createAsyncThunk(
  'experiences/getExperiences',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/experience`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Get experience by ID
export const getExperienceById = createAsyncThunk(
  'experiences/getExperienceById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/experience/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Create experience
export const createExperience = createAsyncThunk(
  'experiences/createExperience',
  async (experienceData, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/experience`,
        experienceData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Update experience
export const updateExperience = createAsyncThunk(
  'experiences/updateExperience',
  async ({ id, experienceData }, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_URL}/api/experience/${id}`,
        experienceData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Delete experience
export const deleteExperience = createAsyncThunk(
  'experiences/deleteExperience',
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`${API_URL}/api/experience/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const initialState = {
  experiences: [],
  experience: null,
  loading: false,
  error: null,
  success: false,
};

const experienceSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    clearExperience: (state) => {
      state.experience = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all experiences cases
      .addCase(getExperiences.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = action.payload;
      })
      .addCase(getExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get experience by ID cases
      .addCase(getExperienceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExperienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.experience = action.payload;
      })
      .addCase(getExperienceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create experience cases
      .addCase(createExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = [...state.experiences, action.payload];
        state.success = true;
        toast.success('Experience created successfully');
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update experience cases
      .addCase(updateExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = state.experiences.map((experience) =>
          experience._id === action.payload._id ? action.payload : experience
        );
        state.success = true;
        toast.success('Experience updated successfully');
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Delete experience cases
      .addCase(deleteExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = state.experiences.filter(
          (experience) => experience._id !== action.payload
        );
        state.success = true;
        toast.success('Experience deleted successfully');
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearError, resetSuccess, clearExperience } = experienceSlice.actions;
export default experienceSlice.reducer;
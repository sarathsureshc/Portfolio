import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

// Get all education entries
export const getEducations = createAsyncThunk(
  'education/getEducations',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/education`);
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

// Get education by ID
export const getEducationById = createAsyncThunk(
  'education/getEducationById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/education/${id}`);
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

// Create education
export const createEducation = createAsyncThunk(
  'education/createEducation',
  async (educationData, { getState, rejectWithValue }) => {
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
        `${API_URL}/api/education`,
        educationData,
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

// Update education
export const updateEducation = createAsyncThunk(
  'education/updateEducation',
  async ({ id, educationData }, { getState, rejectWithValue }) => {
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
        `${API_URL}/api/education/${id}`,
        educationData,
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

// Delete education
export const deleteEducation = createAsyncThunk(
  'education/deleteEducation',
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

      await axios.delete(`${API_URL}/api/education/${id}`, config);
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
  educations: [],
  education: null,
  loading: false,
  error: null,
  success: false,
};

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    clearEducation: (state) => {
      state.education = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all educations cases
      .addCase(getEducations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEducations.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = action.payload;
      })
      .addCase(getEducations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get education by ID cases
      .addCase(getEducationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEducationById.fulfilled, (state, action) => {
        state.loading = false;
        state.education = action.payload;
      })
      .addCase(getEducationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create education cases
      .addCase(createEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = [...state.educations, action.payload];
        state.success = true;
        toast.success('Education created successfully');
      })
      .addCase(createEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update education cases
      .addCase(updateEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = state.educations.map((education) =>
          education._id === action.payload._id ? action.payload : education
        );
        state.success = true;
        toast.success('Education updated successfully');
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Delete education cases
      .addCase(deleteEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = state.educations.filter(
          (education) => education._id !== action.payload
        );
        state.success = true;
        toast.success('Education deleted successfully');
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearError, resetSuccess, clearEducation } = educationSlice.actions;
export default educationSlice.reducer;
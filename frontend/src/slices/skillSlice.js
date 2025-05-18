import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

// Get all skills
export const getSkills = createAsyncThunk(
  'skills/getSkills',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/skills`);
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

// Get skill by ID
export const getSkillById = createAsyncThunk(
  'skills/getSkillById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/skills/${id}`);
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

// Create skill
export const createSkill = createAsyncThunk(
  'skills/createSkill',
  async (skillData, { getState, rejectWithValue }) => {
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
        `${API_URL}/api/skills`,
        skillData,
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

// Update skill
export const updateSkill = createAsyncThunk(
  'skills/updateSkill',
  async ({ id, skillData }, { getState, rejectWithValue }) => {
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
        `${API_URL}/api/skills/${id}`,
        skillData,
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

// Delete skill
export const deleteSkill = createAsyncThunk(
  'skills/deleteSkill',
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

      await axios.delete(`${API_URL}/api/skills/${id}`, config);
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
  skills: [],
  skill: null,
  loading: false,
  error: null,
  success: false,
};

const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    clearSkill: (state) => {
      state.skill = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all skills cases
      .addCase(getSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(getSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get skill by ID cases
      .addCase(getSkillById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkillById.fulfilled, (state, action) => {
        state.loading = false;
        state.skill = action.payload;
      })
      .addCase(getSkillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create skill cases
      .addCase(createSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = [...state.skills, action.payload];
        state.success = true;
        toast.success('Skill created successfully');
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update skill cases
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = state.skills.map((skill) =>
          skill._id === action.payload._id ? action.payload : skill
        );
        state.success = true;
        toast.success('Skill updated successfully');
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Delete skill cases
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = state.skills.filter(
          (skill) => skill._id !== action.payload
        );
        state.success = true;
        toast.success('Skill deleted successfully');
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearError, resetSuccess, clearSkill } = skillSlice.actions;
export default skillSlice.reducer;
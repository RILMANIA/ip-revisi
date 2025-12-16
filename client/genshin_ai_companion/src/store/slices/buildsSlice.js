import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
});

// Thunks
export const fetchMyBuilds = createAsyncThunk(
  "builds/fetchMyBuilds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/builds`, getAuthHeaders());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch builds"
      );
    }
  }
);

export const fetchPublicBuilds = createAsyncThunk(
  "builds/fetchPublicBuilds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/public/builds`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch public builds"
      );
    }
  }
);

export const createBuild = createAsyncThunk(
  "builds/create",
  async (buildData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/builds`,
        buildData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create build"
      );
    }
  }
);

export const updateBuild = createAsyncThunk(
  "builds/update",
  async ({ id, buildData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/builds/${id}`,
        buildData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update build"
      );
    }
  }
);

export const deleteBuild = createAsyncThunk(
  "builds/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/builds/${id}`, getAuthHeaders());
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete build"
      );
    }
  }
);

const buildsSlice = createSlice({
  name: "builds",
  initialState: {
    myBuilds: [],
    publicBuilds: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBuilds: (state) => {
      state.myBuilds = [];
      state.publicBuilds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch my builds
      .addCase(fetchMyBuilds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBuilds.fulfilled, (state, action) => {
        state.loading = false;
        state.myBuilds = action.payload;
      })
      .addCase(fetchMyBuilds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch public builds
      .addCase(fetchPublicBuilds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicBuilds.fulfilled, (state, action) => {
        state.loading = false;
        state.publicBuilds = action.payload;
      })
      .addCase(fetchPublicBuilds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createBuild.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBuild.fulfilled, (state, action) => {
        state.loading = false;
        state.myBuilds.push(action.payload);
      })
      .addCase(createBuild.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateBuild.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBuild.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.myBuilds.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) {
          state.myBuilds[index] = action.payload;
        }
      })
      .addCase(updateBuild.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteBuild.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBuild.fulfilled, (state, action) => {
        state.loading = false;
        state.myBuilds = state.myBuilds.filter((b) => b.id !== action.payload);
      })
      .addCase(deleteBuild.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBuilds } = buildsSlice.actions;
export default buildsSlice.reducer;

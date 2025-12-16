import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
});

// Thunks
export const getAIExplanation = createAsyncThunk(
  "ai/getExplanation",
  async (characterName, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/ai/explain`,
        { characterName },
        getAuthHeaders()
      );
      return { characterName, explanation: response.data.explanation };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get AI explanation"
      );
    }
  }
);

export const getAIRecommendation = createAsyncThunk(
  "ai/getRecommendation",
  async (characterName, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/ai/recommend`,
        { characterName },
        getAuthHeaders()
      );
      return { characterName, recommendation: response.data.recommendation };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get AI recommendation"
      );
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    explanations: {},
    recommendations: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearAIData: (state) => {
      state.explanations = {};
      state.recommendations = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Explanation
      .addCase(getAIExplanation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAIExplanation.fulfilled, (state, action) => {
        state.loading = false;
        state.explanations[action.payload.characterName] =
          action.payload.explanation;
      })
      .addCase(getAIExplanation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Recommendation
      .addCase(getAIRecommendation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAIRecommendation.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations[action.payload.characterName] =
          action.payload.recommendation;
      })
      .addCase(getAIRecommendation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAIData } = aiSlice.actions;
export default aiSlice.reducer;

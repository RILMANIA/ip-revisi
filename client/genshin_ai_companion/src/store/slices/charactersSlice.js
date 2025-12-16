import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GENSHIN_API = import.meta.env.VITE_GENSHIN_API_URL;

// Thunks
export const fetchCharacters = createAsyncThunk(
  "characters/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${GENSHIN_API}/characters`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch characters");
    }
  }
);

export const fetchCharacterDetail = createAsyncThunk(
  "characters/fetchDetail",
  async (characterName, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${GENSHIN_API}/characters/${characterName}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch character details");
    }
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    list: [],
    selectedCharacter: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedCharacter: (state) => {
      state.selectedCharacter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all characters
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch character detail
      .addCase(fetchCharacterDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacterDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCharacter = action.payload;
      })
      .addCase(fetchCharacterDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;

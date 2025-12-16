import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import charactersReducer from "./slices/charactersSlice";
import favoritesReducer from "./slices/favoritesSlice";
import buildsReducer from "./slices/buildsSlice";
import aiReducer from "./slices/aiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    characters: charactersReducer,
    favorites: favoritesReducer,
    builds: buildsReducer,
    ai: aiReducer,
  },
});

export default store;

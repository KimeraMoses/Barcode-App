import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer
  }
});

export default store;

// Exports from slices
export * from './theme/themeSlice';

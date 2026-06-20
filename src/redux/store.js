import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

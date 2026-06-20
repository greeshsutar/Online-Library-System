import { createSlice } from '@reduxjs/toolkit';
import { mockBooks } from '../mockData';

// Load initial books state
const initialState = {
  list: mockBooks,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    /**
     * Adds a new book to the library state.
     * Prepends the book to the list so it appears at the beginning on the Browse page.
     */
    addBook: (state, action) => {
      const newBook = {
        id: Date.now().toString(), // Generate a unique ID
        rating: parseFloat(action.payload.rating),
        popular: false, // Newly added books are not marked as popular by default
        ...action.payload
      };
      state.list.unshift(newBook);
    }
  }
});

export const { addBook } = booksSlice.actions;

// Selectors
export const selectAllBooks = (state) => state.books.list;
export const selectBookById = (state, id) => state.books.list.find(book => book.id === id);

export default booksSlice.reducer;

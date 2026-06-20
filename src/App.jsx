import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BrowseBooks from './pages/BrowseBooks';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import NotFound from './pages/NotFound';

/**
 * Main Layout wrapper including the global header navbar and footer.
 * Wraps content in the main container.
 */
function AppLayout() {
  return (
    <div className="app-container">
      {/* Global Navigation Bar */}
      <Header />

      {/* Main Page Area */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Aesthetic Footer */}
      <footer className="footer-wrapper">
        <div className="footer-container">
          <span>&copy; {new Date().getFullYear()} LibriSphere Library System. All rights reserved.</span>
          <span>Built with React + Vite + Redux</span>
        </div>
      </footer>
    </div>
  );
}

/**
 * App main router routing table.
 */
export default function App() {
  return (
    <Routes>
      {/* Pages that INCLUDE the Header layout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        
        {/* Dynamic route to filter books by category */}
        <Route path="/books/:category" element={<BrowseBooks />} />
        
        {/* Dynamic route to display single book details */}
        <Route path="/book/:id" element={<BookDetails />} />
        
        {/* Page for adding a new book */}
        <Route path="/add-book" element={<AddBook />} />
      </Route>

      {/* Page Not Found 404 Route WITHOUT the Header component */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


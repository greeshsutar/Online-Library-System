import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllBooks } from '../redux/booksSlice';
import BookCard from '../components/BookCard';
import { Search, Inbox, RotateCcw } from 'lucide-react';

// List of genres/categories including 'All' filter option
const categories = ['All', 'Fiction', 'Non-Fiction', 'Sci-Fi', 'Mystery', 'Biography'];

/**
 * BrowseBooks page component.
 * Allows searching by title/author and filtering by genre category dynamically.
 */
export default function BrowseBooks() {
  const { category } = useParams();
  const navigate = useNavigate();
  const allBooks = useSelector(selectAllBooks);
  
  // State for search text input
  const [searchQuery, setSearchQuery] = useState('');

  // Handle active category resolution. Defaults to 'all' if undefined.
  const activeCategory = category || 'all';

  // Filter books based on both route category and search query
  const filteredBooks = allBooks.filter(book => {
    // 1. Filter by category
    const matchesCategory = 
      activeCategory.toLowerCase() === 'all' || 
      book.category.toLowerCase() === activeCategory.toLowerCase();
    
    // 2. Filter by search query (title or author, case-insensitive)
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Category navigation handler
  const handleCategoryClick = (cat) => {
    // Navigate to matching dynamic category route (e.g. /books/Fiction or /books/all)
    navigate(`/books/${cat === 'All' ? 'all' : cat}`);
  };

  // Reset all search inputs and route category to default
  const handleResetFilters = () => {
    setSearchQuery('');
    navigate('/books/all');
  };

  return (
    <div className="browse-books-container">
      {/* Search Bar & Title Layout */}
      <div className="browse-header-layout">
        <div>
          <h2>Explore the Library</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Search by title, author, or filter by your favorite genre
          </p>
        </div>

        <div className="search-filter-bar">
          {/* Real-time search bar */}
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by title or author..."
              className="glass-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter Navigation Pills */}
        <ul className="category-filter-pills">
          {categories.map((cat) => {
            const isPillActive = activeCategory.toLowerCase() === (cat === 'All' ? 'all' : cat.toLowerCase());
            return (
              <li key={cat}>
                <button
                  type="button"
                  className={`category-pill ${isPillActive ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Book Listing Grid */}
      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="empty-state glass-panel">
          <Inbox className="empty-state-icon" size={64} />
          <h3>No Books Found</h3>
          <p>
            We couldn't find any books matching "{searchQuery}" in category "{activeCategory}".
          </p>
          <button onClick={handleResetFilters} className="btn btn-secondary" style={{ marginTop: '8px' }}>
            <RotateCcw size={16} />
            <span>Reset Search & Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}

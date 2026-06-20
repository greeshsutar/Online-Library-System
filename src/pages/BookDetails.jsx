import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBookById } from '../redux/booksSlice';
import CSSBookCover from '../components/CSSBookCover';
import { Star, ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';

/**
 * Detailed view of a single book selected by ID.
 * Features realistic cover render, rating visual stars, and descriptions.
 */
export default function BookDetails() {
  const { id } = useParams();
  
  // Fetch book from the Redux store
  const book = useSelector(state => selectBookById(state, id));

  // Render stars helper
  const renderStars = (rating) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<Star key={i} size={20} fill="currentColor" />);
      } else if (i - 0.5 <= rating) {
        // Render a star with partial opacity for fractional ratings
        stars.push(<Star key={i} size={20} fill="currentColor" style={{ opacity: 0.6 }} />);
      } else {
        stars.push(<Star key={i} size={20} style={{ opacity: 0.25 }} />);
      }
    }
    return stars;
  };

  // Handle case where book does not exist in store
  if (!book) {
    return (
      <div className="empty-state glass-panel" style={{ maxWidth: '500px', margin: '60px auto' }}>
        <h3>Book Not Found</h3>
        <p>The book with the ID "{id}" does not exist in our library catalog.</p>
        <Link to="/books/all" className="btn btn-primary" style={{ marginTop: '12px' }}>
          <ArrowLeft size={16} />
          <span>Back to Browse</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="book-details-container">
      {/* Back to Browse link wrapper */}
      <div className="back-link-wrapper">
        <Link to="/books/all" className="back-link-btn">
          <ArrowLeft size={18} />
          <span>Back to Browse</span>
        </Link>
      </div>

      {/* Main Details Showcase Grid */}
      <div className="details-container glass-panel" style={{ padding: '40px' }}>
        {/* Left Column: Cover Graphic */}
        <div className="details-cover-col">
          <CSSBookCover 
            title={book.title} 
            author={book.author} 
            category={book.category} 
            coverTheme={book.coverTheme}
          />
        </div>

        {/* Right Column: Information Sheet */}
        <div className="details-info-col">
          <div className="details-header">
            <span className="details-category">{book.category}</span>
            <h2 className="details-title">{book.title}</h2>
            <p className="details-author">By {book.author}</p>
          </div>

          {/* Book Rating and Meta details */}
          <div className="details-meta-row">
            <div className="details-meta-item">
              <span className="label">Rating:</span>
              <div className="rating-stars" aria-label={`Rating ${book.rating} out of 5 stars`}>
                {renderStars(book.rating)}
              </div>
              <span className="value" style={{ marginLeft: '4px' }}>
                {book.rating.toFixed(1)} / 5.0
              </span>
            </div>

            <div className="details-meta-item">
              <Tag size={16} className="logo-icon" style={{ opacity: 0.7 }} />
              <span className="label">Genre:</span>
              <span className="value">{book.category}</span>
            </div>
          </div>

          {/* Description Section */}
          <div className="details-section">
            <h3>Synopsis & Description</h3>
            <p className="details-description">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

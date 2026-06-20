
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import CSSBookCover from './CSSBookCover';

/**
 * Renders a glassmorphic book card with hover animations, rating,
 * cover preview, and router links.
 */
export default function BookCard({ book }) {
  return (
    <div className="book-card glass-panel">
      {/* Cover image preview section */}
      <div className="book-card-cover-wrapper">
        <CSSBookCover 
          title={book.title} 
          author={book.author} 
          category={book.category} 
          coverTheme={book.coverTheme}
        />
      </div>

      {/* Book details section */}
      <div className="book-card-info">
        <h3 className="book-card-title" title={book.title}>
          {book.title}
        </h3>
        <p className="book-card-author">By {book.author}</p>
        
        {/* Card footer meta details */}
        <div className="book-card-meta">
          <div className="book-card-rating" aria-label={`Rating ${book.rating} out of 5 stars`}>
            <Star size={14} fill="currentColor" />
            <span>{book.rating.toFixed(1)}</span>
          </div>
          
          <Link to={`/book/${book.id}`} className="book-card-link">
            <span>View Details</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

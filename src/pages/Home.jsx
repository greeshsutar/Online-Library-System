import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-redux'; // Wait, let's use react-router-dom Link!
import { selectAllBooks } from '../redux/booksSlice';
import BookCard from '../components/BookCard';
import { BookOpen, Sparkles, Award, Users, ChevronRight, Bookmark } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

// Categories list with custom descriptive items and icons
const categories = [
  { name: 'Fiction', count: 'Classic & modern stories', icon: Sparkles },
  { name: 'Non-Fiction', count: 'Real world knowledge', icon: BookOpen },
  { name: 'Sci-Fi', count: 'Future worlds & science', icon: Award },
  { name: 'Mystery', count: 'Thrillers & suspense', icon: Users },
  { name: 'Biography', count: 'Lives of great people', icon: Bookmark },
];

/**
 * Home page landing component.
 * Displays welcome header, category cards list, and popular books list.
 */
export default function Home() {
  const allBooks = useSelector(selectAllBooks);

  // Filter out popular books for the landing page showcase
  const popularBooks = allBooks.filter(book => book.popular);

  return (
    <div className="home-page-container">
      {/* Hero Banner Section */}
      <section className="hero-section glass-panel">
        <div className="hero-content">
          <span className="hero-tagline">Welcome to LibriSphere</span>
          <h1 className="hero-title">
            Your Gateway to <br />
            <span className="text-gradient">Infinite Worlds</span>
          </h1>
          <p className="hero-desc">
            Discover a curated collection of literature, manage your library catalog, 
            and share your reading journey in one immersive workspace.
          </p>
          <div className="hero-actions">
            <RouterLink to="/books/all" className="btn btn-primary">
              Explore Collection
            </RouterLink>
          </div>
          
          {/* Quick Metrics dashboard */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">{allBooks.length}</span>
              <span className="stat-label">Total Books</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">4.6</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </div>

        {/* Decorative dynamic floating book pile */}
        <div className="hero-illustration">
          <div className="books-stack">
            <div className="stacked-book stacked-book-1 cover-sunset">
              <div style={{ padding: '15px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>Dune</div>
            </div>
            <div className="stacked-book stacked-book-2 cover-royal">
              <div style={{ padding: '15px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>Midnight Library</div>
            </div>
            <div className="stacked-book stacked-book-3 cover-forest">
              <div style={{ padding: '15px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>Silent Patient</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Links List */}
      <section style={{ marginBottom: '60px' }}>
        <div className="section-header">
          <div className="section-title-wrap">
            <h2>Browse Categories</h2>
            <p>Select a genre to explore matching books</p>
          </div>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <RouterLink 
                key={cat.name} 
                to={`/books/${cat.name}`} 
                className="category-card glass-panel"
              >
                <div className="category-card-icon">
                  <IconComponent size={24} />
                </div>
                <h3 className="category-card-name">{cat.name}</h3>
                <span className="category-card-count">{cat.count}</span>
              </RouterLink>
            );
          })}
        </div>
      </section>

      {/* Popular Books Showcase */}
      <section>
        <div className="section-header">
          <div className="section-title-wrap">
            <h2>Popular Books</h2>
            <p>Our top-rated literature recommendations</p>
          </div>
          <RouterLink to="/books/all" className="section-link">
            <span>View All Books</span>
            <ChevronRight size={16} />
          </RouterLink>
        </div>
        
        <div className="books-grid">
          {popularBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}

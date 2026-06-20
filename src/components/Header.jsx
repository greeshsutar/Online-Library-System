
import { NavLink, Link } from 'react-router-dom';
import { Library, Home, BookOpen, PlusCircle } from 'lucide-react';

/**
 * Global navigation header for the application.
 * Excluded from the 404 Page (as per assignment requirements).
 */
export default function Header() {
  return (
    <header className="header-wrapper">
      <nav className="nav-container">
        {/* App Logo */}
        <Link to="/" className="logo-link">
          <Library className="logo-icon" size={28} />
          <span className="text-gradient">LibriSphere</span>
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
            >
              <Home size={18} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/books/all" 
              className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
            >
              <BookOpen size={18} />
              <span>Browse Books</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/add-book" 
              className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
            >
              <PlusCircle size={18} />
              <span>Add Book</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

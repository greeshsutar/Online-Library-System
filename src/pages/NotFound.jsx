import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

/**
 * 404 Page Not Found Component.
 * Displays the invalid path and routes back to home.
 * Header component is omitted by design via routing layout structure.
 */
export default function NotFound() {
  const location = useLocation();

  return (
    <div className="not-found-wrapper">
      <div className="not-found-content glass-panel">
        {/* Error icon */}
        <Compass size={64} className="logo-icon" style={{ opacity: 0.8 }} />

        {/* Big Code and Title */}
        <h1 className="not-found-code text-gradient">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>

        {/* Description explaining what happened */}
        <p className="not-found-text">
          Oops! The page you are looking for does not exist. You attempted to access the following invalid address:
        </p>

        {/* Display the invalid path on screen (assignment requirement) */}
        <div className="not-found-url">
          {window.location.origin}{location.pathname}
        </div>

        {/* Link back to home page */}
        <Link to="/" className="btn btn-primary" style={{ marginTop: '10px' }}>
          <Home size={18} />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}

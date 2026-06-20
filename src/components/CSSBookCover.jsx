import React from 'react';

// Maps book categories to default cover themes
const categoryThemes = {
  'Fiction': 'royal',
  'Non-Fiction': 'terracotta',
  'Sci-Fi': 'sunset',
  'Mystery': 'forest',
  'Biography': 'industrial'
};

/**
 * Renders a stylized CSS book cover with gradients, shadow texture,
 * spine detailing, and text alignment.
 */
export default function CSSBookCover({ title, author, category, coverTheme }) {
  // Resolve theme: either custom theme or fall back to category-based defaults
  const theme = coverTheme || categoryThemes[category] || 'slate';

  return (
    <div className={`book-cover-container cover-${theme}`}>
      {/* Category badge */}
      <span className="book-cover-badge">{category}</span>

      {/* Book details inside cover */}
      <div className="book-cover-title">{title}</div>
      <div className="book-cover-author">By {author}</div>

      {/* Realism spine effect overlay */}
      <div className="book-cover-spine"></div>
    </div>
  );
}

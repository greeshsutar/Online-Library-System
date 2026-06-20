import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../redux/booksSlice';
import { AlertCircle, PlusCircle, Check } from 'lucide-react';

// Book cover themes available for selection
const themeOptions = [
  { id: 'royal', class: 'cover-royal', name: 'Royal Indigo' },
  { id: 'sunset', class: 'cover-sunset', name: 'Sunset Pink' },
  { id: 'forest', class: 'cover-forest', name: 'Forest Green' },
  { id: 'industrial', class: 'cover-industrial', name: 'Industrial Gray' },
  { id: 'midnight', class: 'cover-midnight', name: 'Midnight Navy' },
];

const categoryOptions = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Mystery', 'Biography'];

/**
 * AddBook page component.
 * Features form validation, state management using Redux, and router redirect.
 */
export default function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    rating: '',
    coverTheme: 'royal'
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Cover theme selector handler
  const handleThemeSelect = (themeId) => {
    setFormData(prev => ({ ...prev, coverTheme: themeId }));
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Book title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a book category';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 15) {
      newErrors.description = 'Description must be at least 15 characters long';
    }

    const ratingVal = parseFloat(formData.rating);
    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
      newErrors.rating = 'Rating must be a number between 1.0 and 5.0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Create book payload and dispatch to Redux store
      dispatch(addBook({
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category,
        description: formData.description.trim(),
        rating: parseFloat(formData.rating),
        coverTheme: formData.coverTheme
      }));

      // Redirect user to Browse Books page where the new book is prepended
      navigate('/books/all');
    }
  };

  return (
    <div className="add-book-container">
      <div className="form-card glass-panel">
        <div className="form-header">
          <h2>Add New Book</h2>
          <p>Contribute to LibriSphere's public collection catalog</p>
        </div>

        <form onSubmit={handleSubmit} className="book-form" noValidate>
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className={`glass-input ${errors.title ? 'input-has-error' : ''}`}
              placeholder="e.g. The Hobbit"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <span className="form-error-msg">
                <AlertCircle size={14} /> {errors.title}
              </span>
            )}
          </div>

          {/* Author Field */}
          <div className="form-group">
            <label htmlFor="author">Author Name</label>
            <input
              type="text"
              id="author"
              name="author"
              className={`glass-input ${errors.author ? 'input-has-error' : ''}`}
              placeholder="e.g. J.R.R. Tolkien"
              value={formData.author}
              onChange={handleChange}
            />
            {errors.author && (
              <span className="form-error-msg">
                <AlertCircle size={14} /> {errors.author}
              </span>
            )}
          </div>

          {/* Category Dropdown and Rating Field Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Category Select */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className={`glass-input ${errors.category ? 'input-has-error' : ''}`}
                value={formData.category}
                onChange={handleChange}
                style={{ appearance: 'none', background: 'rgba(22, 22, 37, 0.9)' }}
              >
                <option value="" disabled>Select genre</option>
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <span className="form-error-msg">
                  <AlertCircle size={14} /> {errors.category}
                </span>
              )}
            </div>

            {/* Rating Field */}
            <div className="form-group">
              <label htmlFor="rating">Rating (1.0 - 5.0)</label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                className={`glass-input ${errors.rating ? 'input-has-error' : ''}`}
                placeholder="e.g. 4.5"
                value={formData.rating}
                onChange={handleChange}
              />
              {errors.rating && (
                <span className="form-error-msg">
                  <AlertCircle size={14} /> {errors.rating}
                </span>
              )}
            </div>
          </div>

          {/* Cover Theme Picker */}
          <div className="form-group">
            <label>Cover Theme Color</label>
            <div className="cover-theme-picker">
              {themeOptions.map((theme) => (
                <button
                  type="button"
                  key={theme.id}
                  className={`theme-option ${theme.class} ${formData.coverTheme === theme.id ? 'selected' : ''}`}
                  onClick={() => handleThemeSelect(theme.id)}
                  title={theme.name}
                  aria-label={`Select ${theme.name} theme`}
                >
                  {formData.coverTheme === theme.id && (
                    <div className="theme-option-checked">
                      <Check size={14} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Description Textarea */}
          <div className="form-group">
            <label htmlFor="description">Synopsis / Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className={`glass-input ${errors.description ? 'input-has-error' : ''}`}
              placeholder="Provide a brief summary of the book plot, concepts or main takeaways..."
              value={formData.description}
              onChange={handleChange}
              style={{ resize: 'vertical', minHeight: '100px' }}
            />
            {errors.description && (
              <span className="form-error-msg">
                <AlertCircle size={14} /> {errors.description}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            <PlusCircle size={18} />
            <span>Publish Book</span>
          </button>
        </form>
      </div>
    </div>
  );
}

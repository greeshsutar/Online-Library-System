# LibriSphere | Modern Online Library System

LibriSphere is a premium, responsive React web application for browsing and managing a library catalog. Built with **Vite**, **React Router**, and **Redux Toolkit**, the application delivers a glassmorphic dark-mode user experience with dynamic custom-themed book covers, multi-genre filtering, real-time search, and rigorous form validation.

---

## 🌟 Key Features

1. **Immersive Landing Page**:
   - Welcome message and real-time library statistics dashboard.
   - Interactive genre navigation cards (Fiction, Non-Fiction, Sci-Fi, Mystery, Biography).
   - "Popular Books" highlight reel featuring the top-rated volumes in our collection.
2. **Category & Dynamic Routing**:
   - Genre navigation maps to clean parameter-based routes (e.g., `/books/Fiction`, `/books/all`).
   - Dynamic parameters filter content instantly with responsive category tabs.
3. **Comprehensive Search**:
   - Live query parsing on the Browse page.
   - Allows users to search for books by **Title** or **Author** simultaneously.
4. **Interactive Book Details**:
   - Dynamic route `/book/:id` displaying granular book details: title, author, category, full synopsis, and visual star rating widgets.
   - Stylized large-scale 3D CSS cover generation.
5. **Redux Form Submission**:
   - Add new books to the library via a validated portal.
   - Includes real-time error messages, a cover style picker, rating validation, and automatic redirection to the top of the collection list.
6. **Graceful Error Handling (404 Page)**:
   - Undefined paths are caught by a wildcard route that displays the invalid URL dynamically on the screen.
   - Hides the navigation header to focus attention and offers a link back to the homepage.

---

## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/) (JavaScript / JSX)
- **Tooling**: [Vite](https://vite.dev/) (For ultra-fast builds and HMR)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (Slices, Actions, and Selectors)
- **Routing**: [React Router DOM v6](https://reactrouter.com/en/main) (Nested layouts and Dynamic URLs)
- **Icons**: [Lucide React](https://lucide.dev/) (Modern vector icons)
- **Styling**: Vanilla CSS (Tailwind-free custom glassmorphism)

---

## 📁 Directory Structure

```
D:/Online_Library_System/
├── src/
│   ├── assets/             # Decorative SVG assets
│   ├── components/         # Reusable global elements
│   │   ├── CSSBookCover.jsx # Dynamic category-themed 3D cover generator
│   │   ├── BookCard.jsx    # Glassmorphic card for book results
│   │   └── Header.jsx      # Navigation header (excluded on 404 page)
│   ├── pages/              # Primary route screens
│   │   ├── Home.jsx        # Landing hero and statistics
│   │   ├── BrowseBooks.jsx # Dynamic filters and search bar
│   │   ├── BookDetails.jsx # Complete book info view
│   │   ├── AddBook.jsx     # Validated form with Redux integration
│   │   └── NotFound.jsx    # Custom 404 handler showing invalid paths
│   ├── redux/              # Store architecture
│   │   ├── store.js        # Configured store
│   │   └── booksSlice.js   # State slice & prepending reducers
│   ├── mockData.js         # Curated list of library books
│   ├── App.css             # Main styling overrides (cleared)
│   ├── App.jsx             # Routes and layout structures
│   ├── index.css           # Global typography and design system rules
│   └── main.jsx            # Application mount point
├── index.html              # HTML shell & font definitions
└── package.json            # Dependencies and script entries
```

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine:

### 📋 Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v16.0.0 or higher) and `npm` installed.

### 📥 Installation

1. Clone or extract the project repository to your local drive.
2. Open a terminal in the project root directory.
3. Install the dependencies:
   ```bash
   npm install
   ```

### 💻 Running Development Server

To start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Once started, open [http://localhost:5173](http://localhost:5173) in your browser.

### 📦 Building for Production

To compile the application into static assets for production deployment:
```bash
npm run build
```
The output files will be written to the `dist/` directory.

### 🔍 Previewing Production Build

To test the compiled production build locally:
```bash
npm run preview
```

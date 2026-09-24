import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getToken, clearToken } from '../api';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!getToken();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="app-header">
      {/* Logo */}
      <Link to="/" className="app-logo">
        <span className="app-logo-icon">🔖</span>
        <span>LLMs Collaborator</span>
      </Link>

      {/* Navigation */}
      <nav className="app-nav">
        {isLoggedIn ? (
          <>
            <Link
              to="/bookmarks"
              className={isActive('/bookmarks') ? 'active' : ''}
            >
              Home
            </Link>

            <Link
              to="/bookmarks"
              className={isActive('/bookmarks') ? 'active' : ''}
            >
              Bookmarks
            </Link>

            <Link
              to="/folders"
              className={isActive('/folders') ? 'active' : ''}
            >
              Folders
            </Link>

            <Link
              to="/tags"
              className={isActive('/tags') ? 'active' : ''}
            >
              Tags
            </Link>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Link>

            <Link
              to="/login"
              className={isActive('/login') ? 'active' : ''}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={isActive('/register') ? 'active' : ''}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

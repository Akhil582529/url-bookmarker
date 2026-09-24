import React, { useState, useEffect } from 'react';
import * as api from '../api';

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/folders');
        setFolders(response.folders || response || []);
      } catch (err) {
        console.error('Error fetching folders:', err);
        setError('Unable to load folders.');
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const filteredFolders = folders.filter((folder) =>
    folder.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="folders-page">
      <div className="folders-container">

        <header className="folders-header">
          <div>
            <div className="eyebrow">YOUR LIBRARY</div>

            <h1>Folders</h1>

            <p>
              Organize your bookmarks into beautiful collections.
            </p>
          </div>

          <button className="primary-button">
            + New Folder
          </button>
        </header>

        <div className="folders-toolbar">
          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search folders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch('')}
              >
                ×
              </button>
            )}
          </div>

          <div className="folder-count">
            <strong>{filteredFolders.length}</strong>{' '}
            {filteredFolders.length === 1 ? 'folder' : 'folders'}
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="folders-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="folder-card skeleton-card" key={item}>
                <div className="skeleton-icon" />
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
              </div>
            ))}
          </div>
        ) : filteredFolders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>

            <h2>
              {search ? 'No folders found' : 'No folders yet'}
            </h2>

            <p>
              {search
                ? `Nothing matches "${search}". Try another search.`
                : 'Create your first folder to start organizing your bookmarks.'}
            </p>

            {search && (
              <button
                className="secondary-button"
                onClick={() => setSearch('')}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="folders-grid">
            {filteredFolders.map((folder) => (
              <article className="folder-card" key={folder.id}>
                <div className="folder-card-top">
                  <div className="folder-icon">📁</div>

                  <button
                    className="folder-menu"
                    aria-label={`Options for ${folder.name}`}
                  >
                    ⋯
                  </button>
                </div>

                <h2 title={folder.name}>
                  {folder.name}
                </h2>

                <div className="folder-meta">
                  <span>
                    {folder.bookmark_count || 0}{' '}
                    {folder.bookmark_count === 1
                      ? 'bookmark'
                      : 'bookmarks'}
                  </span>

                  <span className="arrow">→</span>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Folders;

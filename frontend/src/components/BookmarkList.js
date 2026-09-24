import React, { useState, useEffect } from 'react';
import { get } from '../api';

const BookmarkList = ({ searchTerm, tagFilter, favoriteFilter }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);

        const response = await get('/bookmarks');

        setBookmarks(response.bookmarks || response.data || []);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [searchTerm, tagFilter, favoriteFilter]);

  if (loading) {
    return (
      <div className="bookmark-loading">
        Loading bookmarks...
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="bookmark-empty">
        <div className="empty-icon">🔖</div>
        <h2>No bookmarks found</h2>
        <p>
          Try adding a bookmark or changing your filters.
        </p>
      </div>
    );
  }

  return (
  <div className="bookmarks-page">
    <div className="bookmarks-container">
      <div className="bookmarks-header">
        <div>
          <div className="eyebrow">YOUR LIBRARY</div>
          <h1>Bookmarks</h1>
          <p>Keep your favorite links organized in one place.</p>
        </div>
      </div>

      <div className="bookmark-list">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bookmark-item">
            <h3>{bookmark.title}</h3>

            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookmark.url}
            </a>

            <p>{bookmark.description}</p>

            <p>
              Tags:{' '}
              {Array.isArray(bookmark.tags)
                ? bookmark.tags.join(', ')
                : 'None'}
            </p>

            <p>
              Favorite: {bookmark.favorite ? 'Yes' : 'No'}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default BookmarkList;

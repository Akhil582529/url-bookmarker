import React, { useState } from 'react';
import { post } from '../api';

const FavoriteToggle = ({ bookmarkId, initialIsFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await post(`/api/bookmarks/${bookmarkId}/favorite`);

      setIsFavorite((current) => !current);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`favorite-toggle ${isFavorite ? 'favorite' : ''}`}
      onClick={toggleFavorite}
      disabled={loading}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="favorite-star" aria-hidden="true">
        {isFavorite ? '★' : '☆'}
      </span>
    </button>
  );
};

export default FavoriteToggle;


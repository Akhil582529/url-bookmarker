import React from 'react';

const BookmarkFilter = ({ searchTerm, setSearchTerm, tagFilter, setTagFilter, favoriteFilter, setFavoriteFilter }) => {
  return (
    <div className="bookmark-filter">
      <input
        type="text"
        placeholder="Search bookmarks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by tag..."
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={favoriteFilter}
          onChange={(e) => setFavoriteFilter(e.target.checked)}
        />
        Show only favorites
      </label>
    </div>
  );
};

export default BookmarkFilter;
import React, { useState } from 'react';
import BookmarkList from './BookmarkList';
import BookmarkFilter from './BookmarkFilter';

const Bookmarks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [favoriteFilter, setFavoriteFilter] = useState(false);

  return (
    <div className="bookmarks">
      <h2>Bookmarks</h2>
      <BookmarkFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        favoriteFilter={favoriteFilter}
        setFavoriteFilter={setFavoriteFilter}
      />
      <BookmarkList
        searchTerm={searchTerm}
        tagFilter={tagFilter}
        favoriteFilter={favoriteFilter}
      />
    </div>
  );
};

export default Bookmarks;
import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../api';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    navigate('/search', { state: { searchTerm } });
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
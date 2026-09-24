import React, { useState, useEffect } from 'react';
import { get, post } from '../api';

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await get('/api/tags');
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleAddTag = async () => {
    if (newTag.trim() === '') return;

    try {
      const response = await post('/api/tags', { name: newTag });
      setTags([...tags, response.data]);
      setNewTag('');
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  return (
    <div className="tag-management">
      <h2>Tag Management</h2>
      <div className="tag-input">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Enter new tag"
        />
        <button onClick={handleAddTag}>Add Tag</button>
      </div>
      <ul className="tag-list">
        {tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagManagement;
import React, { useState, useEffect } from 'react'; import '../styles.css'; import { getFolders } from '../api';

const FolderList = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await getFolders();
        setFolders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFolders();
  }, []);

  return (
    <div className="folder-list">
      <h2>Folders</h2>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>
            <span>{folder.name}</span>
            <button onClick={() => handleEditFolder(folder.id)}>Edit</button>
            <button onClick={() => handleDeleteFolder(folder.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const handleEditFolder = (id) => {
  // Implement edit folder logic here
  console.log(`Edit folder ${id}`);
};

const handleDeleteFolder = (id) => {
  // Implement delete folder logic here
  console.log(`Delete folder ${id}`);
};

export default FolderList;
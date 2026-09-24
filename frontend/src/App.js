import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import * as api from './api';
import { AuthProvider } from './components/AuthContext';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Bookmarks from './components/Bookmarks';
import Folders from './components/Folders';
import TagManagement from './components/TagManagement';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Bookmarks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/folders" element={<Folders />} />
              <Route path="/tags" element={<TagManagement />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
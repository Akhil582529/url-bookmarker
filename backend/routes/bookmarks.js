const express = require('express');
const router = express.Router();
const { pool, query } = require('../db');
const { authenticateToken } = require('./auth');

// POST /api/bookmarks - Create a new bookmark
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, url, description, folder_id, tags } = req.body;
    const userId = req.user.id;
    
    // Validate required fields
    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }
    
    // Insert bookmark
    const bookmarkResult = await query(
      'INSERT INTO bookmarks (title, url, description, user_id, folder_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, url, description || '', userId, folder_id || null]
    );
    
    const bookmark = bookmarkResult.rows[0];
    
    // Handle tags if provided
    if (tags && Array.isArray(tags) && tags.length > 0) {
      const tagInsertPromises = tags.map(tagId => 
        query('INSERT INTO bookmark_tags (bookmark_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [bookmark.id, tagId])
      );
      await Promise.all(tagInsertPromises);
    }
    
    res.status(201).json(bookmark);
  } catch (error) {
    console.error('Error creating bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/bookmarks - List bookmarks with optional search, tag, and favorite filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { search, tag, favorite } = req.query;
    
    let baseQuery = 'SELECT b.*, f.name as folder_name FROM bookmarks b LEFT JOIN folders f ON b.folder_id = f.id WHERE b.user_id = $1';
    let params = [userId];
    let paramIndex = 2;
    
    // Add search filter
    if (search) {
      baseQuery += ` AND (b.title ILIKE $${paramIndex} OR b.url ILIKE $${paramIndex} OR b.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }
    
    // Add tag filter
    if (tag) {
      baseQuery += ` AND b.id IN (SELECT bt.bookmark_id FROM bookmark_tags bt JOIN tags t ON bt.tag_id = t.id WHERE t.id = $${paramIndex} AND t.user_id = $1)`;
      params.push(tag);
      paramIndex++;
    }
    
    // Add favorite filter
    if (favorite !== undefined) {
      baseQuery += ` AND b.favorite = $${paramIndex}`;
      params.push(favorite === 'true' || favorite === '1');
      paramIndex++;
    }
    
    baseQuery += ' ORDER BY b.created_at DESC';
    
    const result = await query(baseQuery, params);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/bookmarks/:id - Get bookmark details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const result = await query(
      'SELECT b.*, f.name as folder_name FROM bookmarks b LEFT JOIN folders f ON b.folder_id = f.id WHERE b.id = $1 AND b.user_id = $2',
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    
    const bookmark = result.rows[0];
    
    // Get associated tags
    const tagsResult = await query(
      'SELECT t.id, t.name FROM tags t JOIN bookmark_tags bt ON t.id = bt.tag_id WHERE bt.bookmark_id = $1',
      [id]
    );
    
    bookmark.tags = tagsResult.rows;
    
    res.json(bookmark);
  } catch (error) {
    console.error('Error fetching bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/bookmarks/:id - Update a bookmark
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, description, folder_id, tags } = req.body;
    const userId = req.user.id;
    
    // Validate required fields
    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }
    
    // Update bookmark
    const bookmarkResult = await query(
      'UPDATE bookmarks SET title = $1, url = $2, description = $3, folder_id = $4, updated_at = NOW() WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, url, description || '', folder_id || null, id, userId]
    );
    
    if (bookmarkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    
    const bookmark = bookmarkResult.rows[0];
    
    // Update tags if provided
    if (tags !== undefined) {
      // First delete existing tags
      await query('DELETE FROM bookmark_tags WHERE bookmark_id = $1', [id]);
      
      // Then insert new tags
      if (Array.isArray(tags) && tags.length > 0) {
        const tagInsertPromises = tags.map(tagId => 
          query('INSERT INTO bookmark_tags (bookmark_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [id, tagId])
        );
        await Promise.all(tagInsertPromises);
      }
    }
    
    res.json(bookmark);
  } catch (error) {
    console.error('Error updating bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/bookmarks/:id - Delete a bookmark
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Delete from bookmark_tags first
    await query('DELETE FROM bookmark_tags WHERE bookmark_id = $1', [id]);
    
    // Then delete the bookmark
    const result = await query(
      'DELETE FROM bookmarks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    
    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/bookmarks/:id/favorite - Toggle favorite status for a bookmark
router.post('/:id/favorite', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Get current bookmark
    const bookmarkResult = await query(
      'SELECT favorite FROM bookmarks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    
    if (bookmarkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    
    const currentFavorite = bookmarkResult.rows[0].favorite;
    const newFavorite = !currentFavorite;
    
    // Update favorite status
    const result = await query(
      'UPDATE bookmarks SET favorite = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3 RETURNING *',
      [newFavorite, id, userId]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
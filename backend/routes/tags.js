const express = require('express');
const router = express.Router();
const { pool, query } = require('../db');
const { authenticateToken } = require('./auth');

// GET /api/tags - List all tags for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await query('SELECT id, name, created_at FROM tags WHERE user_id = $1 ORDER BY name', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tags - Create a new tag for the authenticated user
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name } = req.body;

    // Validate input
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Tag name is required and must be a non-empty string' });
    }

    const trimmedName = name.trim();

    // Check if tag with this name already exists for this user
    const existingTagResult = await query(
      'SELECT id FROM tags WHERE user_id = $1 AND LOWER(name) = LOWER($2)', 
      [userId, trimmedName]
    );

    if (existingTagResult.rows.length > 0) {
      return res.status(400).json({ error: 'A tag with this name already exists' });
    }

    // Create new tag
    const result = await query(
      'INSERT INTO tags (user_id, name) VALUES ($1, $2) RETURNING id, name, created_at', 
      [userId, trimmedName]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/bookmarks/:id/tags - Add tags to a bookmark
router.post('/:id/tags', authenticateToken, async (req, res) => {
  try {
    const bookmarkId = parseInt(req.params.id);
    const { tagIds } = req.body;
    
    // Verify bookmark exists and belongs to user
    const bookmarkResult = await query('SELECT id, user_id FROM bookmarks WHERE id = $1', [bookmarkId]);
    if (bookmarkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    
    if (bookmarkResult.rows[0].user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Forbidden: Bookmark does not belong to user' });
    }
    
    // Validate tagIds array
    if (!Array.isArray(tagIds) || tagIds.length === 0) {
      return res.status(400).json({ error: 'tagIds must be a non-empty array' });
    }
    
    // Check if tags exist and belong to user
    const placeholders = tagIds.map((_, i) => `$${i + 1}`).join(',');
    const tagCheckResult = await query(`
      SELECT t.id, t.name 
      FROM tags t 
      WHERE t.id IN (${placeholders}) AND t.user_id = $${tagIds.length + 1}
    `, [...tagIds, req.user.userId]);
    
    if (tagCheckResult.rows.length !== tagIds.length) {
      return res.status(400).json({ error: 'One or more tags do not exist or do not belong to the user' });
    }
    
    // Insert tags into bookmark_tags table
    const insertPromises = tagIds.map(tagId => 
      query('INSERT INTO bookmark_tags (bookmark_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [bookmarkId, tagId])
    );
    
    await Promise.all(insertPromises);
    
    // Get the updated list of tags for this bookmark
    const tagsResult = await query(`
      SELECT t.id, t.name 
      FROM tags t 
      JOIN bookmark_tags bt ON t.id = bt.tag_id 
      WHERE bt.bookmark_id = $1
    `, [bookmarkId]);
    
    res.status(201).json({
      message: 'Tags added successfully',
      tags: tagsResult.rows
    });
  } catch (error) {
    console.error('Error adding tags to bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/bookmarks/:id/tags/:tagId - Remove a tag from a bookmark
router.delete('/:id/tags/:tagId', authenticateToken, async (req, res) => {
  try {
    const bookmarkId = parseInt(req.params.id);
    const tagId = parseInt(req.params.tagId);
    
    // Verify bookmark exists and belongs to user
    const bookmarkResult = await query('SELECT id, user_id FROM bookmarks WHERE id = $1', [bookmarkId]);
    if (bookmarkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    
    if (bookmarkResult.rows[0].user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Forbidden: Bookmark does not belong to user' });
    }
    
    // Verify tag exists and belongs to user
    const tagResult = await query('SELECT id, user_id FROM tags WHERE id = $1', [tagId]);
    if (tagResult.rows.length === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    if (tagResult.rows[0].user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Forbidden: Tag does not belong to user' });
    }
    
    // Delete the association
    const deleteResult = await query('DELETE FROM bookmark_tags WHERE bookmark_id = $1 AND tag_id = $2', [bookmarkId, tagId]);
    
    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: 'Tag association not found' });
    }
    
    res.json({ message: 'Tag removed successfully' });
  } catch (error) {
    console.error('Error removing tag from bookmark:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
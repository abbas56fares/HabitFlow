const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  db.query(
    'SELECT * FROM habits WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, habits) => {
      if (err) {
        console.error('Get habits error:', err);
        return res.status(500).json({ error: 'Failed to fetch habits', details: err.message });
      }
      res.json(habits);
    }
  );
});


router.post('/', (req, res) => {
  const { userId, title, description, category } = req.body;

  if (!userId || !title) {
    return res.status(400).json({ error: 'User ID and title are required' });
  }

  db.query(
    'INSERT INTO habits (user_id, title, description, category, streak) VALUES (?, ?, ?, ?, ?)',
    [userId, title, description || '', category || '', 0],
    (err, result) => {
      if (err) {
        console.error('Create habit error:', err);
        return res.status(500).json({ error: 'Failed to create habit', details: err.message });
      }

      res.status(201).json({
        message: 'Habit created successfully',
        habitId: result.insertId
      });
    }
  );
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, category, streak } = req.body;

  db.query(
    'UPDATE habits SET title = ?, description = ?, category = ?, streak = ? WHERE id = ?',
    [title, description, category, streak || 0, id],
    (err, result) => {
      if (err) {
        console.error('Update habit error:', err);
        return res.status(500).json({ error: 'Failed to update habit', details: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Habit not found' });
      }

      res.json({ message: 'Habit updated successfully' });
    }
  );
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM habits WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Delete habit error:', err);
      return res.status(500).json({ error: 'Failed to delete habit', details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    res.json({ message: 'Habit deleted successfully' });
  });
});

module.exports = router;

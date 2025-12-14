const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.query(
    'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    (err, result) => {
      if (err) {
        console.error('Contact form error:', err);
        return res.status(500).json({ error: 'Failed to send message', details: err.message });
      }

      res.status(201).json({
        message: 'Message sent successfully',
        messageId: result.insertId
      });
    }
  );
});


router.get('/', (req, res) => {
  db.query('SELECT * FROM contact_messages ORDER BY created_at DESC', (err, messages) => {
    if (err) {
      console.error('Get messages error:', err);
      return res.status(500).json({ error: 'Failed to fetch messages', details: err.message });
    }
    res.json(messages);
  });
});

module.exports = router;

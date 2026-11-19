const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.query(
    'SELECT * FROM users WHERE email = ? OR username = ?',
    [email, username],
    (selectErr, existingUsers) => {
      if (selectErr) {
        console.error('Registration lookup error:', selectErr);
        return res.status(500).json({ error: 'Registration failed', details: selectErr.message });
      }

      if (existingUsers.length > 0) {
        return res.status(400).json({ error: 'User already exists with this email or username' });
      }

      db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password],
        (insertErr, result) => {
          if (insertErr) {
            console.error('Registration insert error:', insertErr);
            return res.status(500).json({ error: 'Registration failed', details: insertErr.message });
          }

          res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId
          });
        }
      );
    }
  );
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (selectErr, users) => {
      if (selectErr) {
        console.error('Login query error:', selectErr);
        return res.status(500).json({ error: 'Login failed', details: selectErr.message });
      }

      if (users.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = users[0];

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    }
  );
});

module.exports = router;

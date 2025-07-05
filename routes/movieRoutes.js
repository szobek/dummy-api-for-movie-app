const db = require('../db');
const express = require('express'),
router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM movies', (error, results) => {
    if (error) {
      console.error('Database query failed:', error);
      res.status(500).send('Database error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('No movies found');
      return;
    }
    res.status(200).json(results);

  });
});

router.get('/:id', (req, res) => {
  const movieId = req.params.id;
  db.query('SELECT * FROM movies WHERE id = ?', [movieId], (error, results) => {
    if (error) {
      console.error('Database query failed:', error);
      res.status(500).send('Database error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Movie not found');
      return;
    }
    res.status(200).json(results[0]);
  });
});

module.exports = router;
const express = require('express'),
router = express.Router();

const knex = require('../db');

router.get('/', async (req, res) => {
  const movies = await knex('movies').select('*');
  res.json(movies);
});
router.get('/:id', (req, res) => {
  const movieId = req.params.id;
 knex('movies').where('id', movieId).first().then((movie) => {
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });


});

module.exports = router;
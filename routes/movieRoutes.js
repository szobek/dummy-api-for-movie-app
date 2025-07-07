const express = require('express')
const router = express.Router()
const knex = require('../db')

router.get('/', async (req, res) => {
  const movies = await knex('movies')
    .select('*');
  res.json(movies);
});

router.get('/genres', async (req, res) => {
  const genres = await knex('genres')
    .select('*');
  res.json(genres);
});

router.get('/genres/:id', async (req, res) => {
  const genreId = req.params.id;
  await knex('movie-genre')
    .whereRaw('BINARY ?? = ?', ['genre_id',genreId])
    .then(
      (results)=>{
        if (results.length > 0) {
          knex('movies')
            .whereIn('id', results.map(result => result.movie_id))
            .then((movies) => {
              res.json(movies);
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: 'Internal server error' });
            });
        } else {
          res.status(404).json({ error: 'Genre in movies not found' });
        }
      }
    )
})

  router.get('/:id', async (req, res) => {
    const movieId = req.params.id;
    await knex('movies').where('id', movieId).first().then((movie) => {
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

  router.post('/search', async (req, res) => {
    const searchTerm = req.body;
    await knex('movies')
      .where('title', 'like', `%${searchTerm.title}%`)
      .where('year', 'like', `${searchTerm.year}%`)
      .where('rating', '>=', searchTerm.rating)
      .then((movies) => {
        res.status(200).json(movies);
      }).catch((err) => {
        console.error(err);
      });
  });



  module.exports = router;
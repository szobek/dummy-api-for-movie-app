import express from 'express';
const router = express.Router()
import knex from '../db.js';
import {
  getAllGenre,
  getAllMovies,
  getMoviesByGenre,
  getMovieById,
  getMoviesById
} from '../services/movieService.js';

router.get('/', async (req, res) => {
  getAllMovies(req, res)
});

router.get('/actors', async (req, res) => {
  await knex('actors')
    .select('*')
    .then((actors) => {
      res.json(actors);
    })
})
router.get('/genres', async (req, res) => {
  getAllGenre().then((genres) => {
    res.json(genres);
  })
});

router.get('/genres/:id', async (req, res) => {
  const genreId = req.params.id;
  if (!genreId || isNaN(genreId)) {
    return res.status(400).json({ error: 'Invalid genre ID' });
  }
  getMoviesByGenre(genreId)
    .then(
      (results) => {
        if (results.length > 0) {
          getMoviesById(results.map(result => result.movie_id))
            .then((movies) => {
              res.json(movies);
            })
            .catch((err) => {
              res.status(500).json({ error: 'Internal ___ server error' });
            });
        } else {
          res.status(404).json({ error: 'Genre in movies not found' });
        }
      }
    )
})

router.get('/:id', async (req, res) => {
  const movieId = req.params.id;
  if (!movieId || isNaN(movieId)) {
    return res.status(400).json({ error: 'Invalid movie ID' });
  }
  getMovieById(movieId)
    .then((movie) => {
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



router.get('/actors/:id', async (req, res) => {
  const actorId = req.params.id;
  if (!actorId || isNaN(actorId)) {
    return res.status(400).json({ error: 'Invalid actor ID' });
  }
  await knex('movie-actors')
    .where('actor_id', actorId)
    .then((results) => {
      if (results.length > 0) {
        getMoviesById(results.map(result => result.movie_id))
          .then((movies) => {
            res.json(movies);
          })
          .catch((err) => {
            res.status(500).json({ error: 'Internal ___ server error' });
          });
      } else {
        res.status(404).json({ error: 'Genre in movies not found' });
      }
    })
}
)




export default router;
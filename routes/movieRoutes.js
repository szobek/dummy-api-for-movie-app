import express from 'express';
const router = express.Router()
import knex from '../db.js';
import {
  getAllGenre,
  getAllMovies,
  getMoviesByGenre,
  getMovieById,
  getMoviesById,
  searchMovies
} from '../services/movieService.js';
import { ListGenreDto } from '../dtos/listGenreDto.js';
import { ListActorsDto } from '../dtos/ListActorsDto.js';


router.get('/', async (req, res) => {
  getAllMovies(req, res)
});


router.get('/actors', async (req, res) => {
  await knex('actors')
    .select('*')
    .then((actors) => {
      if (actors.length === 0) {
        return res.status(404).json({ error: 'Actors not found' });
      }
      let dto = []
      actors.forEach(actor => {
        dto.push(new ListActorsDto(actor.id, actor.fullName, actor.bio, actor.sex, actor.date_of_birth).toJSON())
      })
      res.json(dto);
    })
})
router.get('/genres', async (req, res) => {
  let dto=[]
  getAllGenre().then((genres) => {
    if (genres.length === 0) {
      return res.status(404).json({ error: 'Genres not found' });
    }
    genres.forEach(genre => {
      dto.push(new ListGenreDto(genre.id,genre.name).toJSON())
    })
    res.json(dto);
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
              if (movies.length === 0) {
                return res.status(404).json({ error: 'Movies not found' });
              }
              
              res.json(movies);
            })
            .catch((err) => {
              res.status(500).json({ error: 'Internal server error' });
            });
        } else {
          res.json([])
          // res.status(404).json({ error: 'Genre in movies not found' });
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
 searchMovies(req,res)
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
        res.json([])
      }
    })
}
)

export default router;
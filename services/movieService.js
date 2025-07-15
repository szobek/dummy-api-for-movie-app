import knex from '../db.js';

const getAllMovies = async (req, res) => {
  const query = "SELECT   m.id AS movie_id,  m.title,  m.year,  m.rating,  m.director,  m.description,  m.poster_url,  GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR ', ') AS genres,  GROUP_CONCAT(DISTINCT a.fullName ORDER BY a.fullName SEPARATOR ', ') AS actors FROM movies AS m LEFT JOIN `movie-genre` AS mg ON m.id = mg.movie_id LEFT JOIN   genres AS g ON mg.genre_id = g.id LEFT JOIN `movie-actors` AS ma ON m.id = ma.movie_id  LEFT JOIN  actors AS a ON ma.actor_id = a.id GROUP BY m.id, m.title, m.year, m.rating, m.director, m.description, m.poster_url;"
  return await knex.raw(query).then((alldata) => {
    const formattedData = formatResultObject(alldata[0])
    res.json(formattedData)
  }).catch((err) => {
    res.status(500).json({ error: 'Internal server error' });
  })
}
const getAllGenre = async () => {
  return await knex('genres')
    .select('*')
}
const getMovieById = async (id) => {
  const query = "SELECT   m.id AS movie_id,   m.title,  m.year,  m.rating,  m.director,  m.description,  m.poster_url,  GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR ', ') AS genres,  GROUP_CONCAT(DISTINCT a.fullName ORDER BY a.fullName SEPARATOR ', ') AS actors FROM   movies AS m LEFT JOIN `movie-genre` AS mg ON m.id = mg.movie_id LEFT JOIN genres AS g ON mg.genre_id = g.id LEFT JOIN `movie-actors` AS ma ON m.id = ma.movie_id LEFT JOIN actors AS a ON ma.actor_id = a.id WHERE m.id = ? GROUP BY  m.id, m.title, m.year, m.rating, m.director, m.description, m.poster_url;"
  return await knex.raw(query, [id]).then((data) => {
    const formattedData = formatResultObject(data[0])
    return formattedData[0]
  }).catch((err) => {
    console.error(err);
  });
}
const getMoviesByGenre = async (id) => {
  return await knex('movie-genre')
    .where('genre_id', id)
    .select('movie_id')
}
const getMoviesById = async (idArray) => {
  let movies = []
  if (idArray.length === 0) {
    return movies
  }
  for (const id of idArray) {
    await movies.push(await getMovieById(id))
  }

  return movies
}
const searchMovies = async (req, res) => {
  const query = "SELECT m.id AS movie_id,  m.title AS title,  m.description AS description,  m.rating AS rating,  m.year AS year,  GROUP_CONCAT(DISTINCT a2.fullName SEPARATOR ', ') AS actors,  GROUP_CONCAT(DISTINCT g.name SEPARATOR ', ') AS genres,  m.id FROM   movies m JOIN   `movie-actors` ma ON m.id = ma.movie_id JOIN   actors a ON ma.actor_id = a.id LEFT JOIN `movie-actors` ma2 ON m.id = ma2.movie_id LEFT JOIN actors a2 ON ma2.actor_id = a2.id LEFT JOIN `movie-genre` mg ON m.id = mg.movie_id LEFT JOIN genres g ON mg.genre_id = g.id WHERE a.fullName LIKE ? AND m.title LIKE ? AND m.year >= ? AND m.rating >= ? AND g.id LIKE ? GROUP BY m.id, m.title, m.description, m.rating, m.year ORDER BY m.year DESC, m.title;"
  const searchTerm = req.body;
  if (searchTerm.genre === "") {
    searchTerm.genre = "%"
  }
  if (searchTerm.title === "") {
    searchTerm.title = "%"
  }
  if (searchTerm.actor === "") {
    searchTerm.actor = "%"
  }
  if (searchTerm.year === "") {
    searchTerm.year = "1900"
  }

  if (searchTerm.rating === "") {
    searchTerm.rating = 1
  }
  const q = [
    `%${searchTerm.actor}%`,
    `%${searchTerm.title}%`,
    `${searchTerm.year}`,
    searchTerm.rating,
    searchTerm.genre
  ]
  return await knex.raw(query,q)
    .then((movies) => {
      const formattedData = formatResultObject(movies[0])
      res.status(200).json(formattedData);
    }).catch((err) => {
      console.error(err);
    });
}
const formatResultObject = (data) => {
  data.forEach(data => {
    // egy film adatai
    if (data["genres"]) {
      data["genres"] = data["genres"].split(', ');
    }
    else {
      data["genres"] = [];
    }
    if (data["actors"]) {
      data["actors"] = data["actors"].split(', ');
    } else {
      data["actors"] = [];
    }
  })
  return data;
}

export { getAllMovies, getAllGenre, getMovieById, getMoviesByGenre, getMoviesById, searchMovies }
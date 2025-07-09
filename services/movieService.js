import knex from '../db.js';

const getAllMovies=async (req,res)=>{
     const query = "SELECT   m.id AS movie_id,  m.title,  m.year,  m.rating,  m.director,  m.description,  m.poster_url,  GROUP_CONCAT(DISTINCT g.name ORDER BY g.name SEPARATOR ', ') AS genres,  GROUP_CONCAT(DISTINCT a.fullName ORDER BY a.fullName SEPARATOR ', ') AS actors FROM movies AS m LEFT JOIN `movie-genre` AS mg ON m.id = mg.movie_id LEFT JOIN   genres AS g ON mg.genre_id = g.id LEFT JOIN `movie-actors` AS ma ON m.id = ma.movie_id  LEFT JOIN  actors AS a ON ma.actor_id = a.id GROUP BY m.id, m.title, m.year, m.rating, m.director, m.description, m.poster_url;"
    return await knex.raw(query).then((alldata) => {
    alldata[0].forEach(data => {
      // egy film adatai
      if(data["genres"])      data["genres"] = data["genres"].split(', ');
      if(data["actors"])      data["actors"] = data["actors"].split(', ');
    })
    res.json(alldata[0])
  }).catch((err) => {
    res.status(500).json({ error: 'Internal server error' });
  })
}
const getAllGenre=async ()=>{
    return await knex('genres')
    .select('*')
}
const getMovieById=async (id)=>{
    return await knex('movies')
    .where('id', id)
    .first()
}
const getMoviesByGenre=async (id)=>{
    return await knex('movie-genre')
    .where('genre_id', id)
    .select('movie_id')
}
const getMoviesById=async (idArray)=>{
    return await knex('movies')
    .whereIn('id', idArray)
    .select('*')
}

export {getAllMovies,getAllGenre,getMovieById,getMoviesByGenre, getMoviesById}
import knex from '../db.js';

const getAllMovies=async ()=>{
    return await knex('movies')
    .select('*')
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
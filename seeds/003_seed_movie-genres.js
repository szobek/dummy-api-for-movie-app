const { movie_genres } = require("../data_files/movie-genres");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie-genre').del()
  await knex('movie-genre').insert(movie_genres);
};

const { actors_in_movies } = require("../data_files/actors-in-movies");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie-actors').del()
  await knex('movie-actors').insert(actors_in_movies);
};

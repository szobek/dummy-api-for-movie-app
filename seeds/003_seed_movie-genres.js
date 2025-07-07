import { movie_genres } from "../data_files/movie-genres.js";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie-genre').del()
  await knex('movie-genre').insert(movie_genres);
};

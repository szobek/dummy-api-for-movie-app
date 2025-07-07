import { actors_in_movies } from "../data_files/actors-in-movies.js";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie-actors').del()
  await knex('movie-actors').insert(actors_in_movies);
};

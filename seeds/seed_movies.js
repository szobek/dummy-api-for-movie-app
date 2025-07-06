const movies=require('../movies');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // console.log(movies);
  
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert(movies.movies);
};

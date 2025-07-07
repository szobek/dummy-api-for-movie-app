const { actors } = require("../data_files/actors");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('actors').del()
  await knex('actors').insert(actors);
};

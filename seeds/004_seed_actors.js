import { actors } from "../data_files/actors.js";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('actors').del()
  await knex('actors').insert(actors);
};

import fetchDataBeforeSeed  from "../fetch-data-before-seed.js";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function (knex) {
  try {
    await fetchDataBeforeSeed(knex)
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
  }
};

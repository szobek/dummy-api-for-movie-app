// import { movie_genres } from "../data_files/movie-genres.js";
import { google } from 'googleapis';
import keys from '../google_keys.json' with { type: 'json' };
import dotenv from 'dotenv';
dotenv.config();

const auth = new google.auth.GoogleAuth({
  credentials: keys,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('movie-genre').insert(movie_genres);
  await fetchDataBeforeSeed(knex)
};

const fetchDataBeforeSeed = async (knex) => {
  let movieId = 0
  let result = null
  const objects = []
  try {
    await knex('movie-genre').del()
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || '';
    const range = process.env.GOOGLE_SHEET_RANGE || '';
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const dataFromSheet = response.data.values;
    if (dataFromSheet && dataFromSheet.length > 0) {

      await knex('genres')
        .select('id', 'name')
        .then((res) => {
          dataFromSheet.forEach((row) => {
            movieId++;
            if (row[4]) {
              const movieGenresArray = row[4].split(',')
              movieGenresArray.forEach((genre) => {
                res.forEach(async (dbgenre) => {
                  if (genre.trim() === dbgenre.name) {
                    const obj = {
                      movie_id: movieId,
                      genre_id: dbgenre.id
                    }
                    objects.push(obj)
                  }
                })
              })
            }
          })
        })

    } else {
      console.log('No data found in Google Sheets.');
    }

    await knex('movie-genre').insert(objects);

  } catch (error) {
    console.error('Error inserting movie genres:', error);
  }
}

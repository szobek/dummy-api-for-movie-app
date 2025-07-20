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
export const seed = async function(knex) {
  await fetchDataBeforeSeed(knex)
};

const fetchDataBeforeSeed = async (knex) => {
  let movieId = 0
  const objects = []
  try {
    await knex('movie-actors').del()
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

      await knex('actors')
        .select('id', 'fullName')
        .then((res) => {
          dataFromSheet.forEach((row) => {
            movieId++;
            if (row[5]&&row[5].includes(',')) {
              const movieActorArray = row[5].split(',')
              movieActorArray.forEach((actor) => {
                res.forEach(async (dbactor) => {
                  if (actor.trim() === dbactor.fullName) {
                    const obj = {
                      movie_id: movieId,
                      actor_id: dbactor.id
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

    await knex('movie-actors').insert(objects);

  } catch (error) {
    console.error('Error inserting movie actors:', error);
  }
}

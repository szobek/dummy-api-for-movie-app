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
  await fetchDataBeforeSeed(knex);
};


const fetchDataBeforeSeed = async (knex) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || '';
  const range = process.env.GOOGLE_SHEET_RANGE_FOR_ACTORS || '';
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  const dataFromSheet = response.data.values;

  if (dataFromSheet && dataFromSheet.length > 0) {
    await knex('actors').del()
    const actorsFromSheet = convert(dataFromSheet);
    await knex('actors').insert(actorsFromSheet);
  } else {
    console.log('No data found in Google Sheets.');
  }
}


const convert = (data) => {
  let id = 0
  let actors = []
  actors = data.map((row, index) => {
    const obj = {}
    if (row[0] && row[0] !== undefined) {
      obj.id = ++id;
      obj.fullName = row[0].trim();
      obj.bio = row[1].trim();
      obj.sex = row[2].trim();
      obj.date_of_birth = row[3].trim();
    }
    return obj;
  });
  return actors

}
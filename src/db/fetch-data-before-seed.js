import { google } from 'googleapis';
import keys from './google_keys.json' with { type: 'json' };
import dotenv from 'dotenv';
dotenv.config();

const auth = new google.auth.GoogleAuth({
    credentials: keys,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});
const fetchDataBeforeSeed = async (knex) => {
  
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || '';
    const range = process.env.GOOGLE_SHEET_RANGE_FOR_MOVIES || '';
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });
    const dataFromSheet = response.data.values;
    
    if (dataFromSheet && dataFromSheet.length > 0) {
        const movies = convert(dataFromSheet);
        await knex('movies').del();
        await knex('movies').insert(movies);
    } else {
        console.log('No data found in Google Sheets.');
    }
}



const convert = (data) => {
  return data.map((row,index) => {
    return {
      id:index+1,
      title: row[0],
      description: row[1],
      year: parseInt(row[2]),
      rating: parseFloat(row[3]),
      director: row[7],
      // genres: (row[4]&&row[4]!==undefined&&row[4].includes(','))?row[4].split(','):"",
      // actors: (row[5]&&row[5]!==undefined&&row[5].includes(','))?row[5].split(','):"",
      // poster_url: row[6],
    }
  })
}

export default fetchDataBeforeSeed;
import express from 'express';
import { google } from 'googleapis';
import keys from './google_keys.json' with { type: 'json' };

const app = express();
import movieRoutes from './routes/movieRoutes.js';
// require('dotenv').config();
import dotenv from 'dotenv';
import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
dotenv.config();

const auth = new google.auth.GoogleAuth({
  credentials: keys,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

app.get('/data', async (req, res) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '1p6-tKnTOQdKGPFxyt05FTaCDkBNuUL3aUaI0xaLkU8o'; // found in the sheet URL
  const range = 'Tagok!A1:F1000'; // adjust range as needed

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    res.json(response.data.values);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    res.status(500).send('Error fetching data');
  }
});

app.use(express.json());
app.use('/movies', movieRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

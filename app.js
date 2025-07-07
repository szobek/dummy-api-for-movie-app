import express from 'express';

const app = express();
import {movieRoutes} from './routes/movieRoutes';
require('dotenv').config();

app.use(express.json());
app.use('/movies', movieRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

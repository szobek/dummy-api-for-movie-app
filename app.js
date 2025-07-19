import express from 'express';

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

app.use(express.json());
app.use('/movies', movieRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

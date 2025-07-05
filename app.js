const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express + MySQL!__');
  
});

app.get('/movies', (req, res) => {
db.query('SELECT * FROM movies', (error, results) => {
    if (error) {
      console.error('Database query failed:', error);
      res.status(500).send('Database error');
      return;
    }
    results.forEach(movie => {
      console.log(`Movie: ${movie.title}, Year: ${movie.year}, Rating: ${movie.rating}, description: ${movie.description}`);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

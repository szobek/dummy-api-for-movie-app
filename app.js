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
    if (results.length === 0) {
      res.status(404).send('No movies found');
      return;
    }
    res.status(200).json(results);

  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

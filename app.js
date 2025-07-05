const express = require('express');
const app = express();
const PORT = 3000;
const movieRoutes = require('./routes/movieRoutes');
app.use(express.json());

app.use('/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

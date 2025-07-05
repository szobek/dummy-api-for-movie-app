const moviesInFile = require('./movies.js');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movie_db'
});

const createMoviesTable = () => {
    connection.query(`
        CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        rating DECIMAL(3, 1) NOT NULL,
        description TEXT NOT NULL
        )`, (error, results) => {
        if (error) {
            console.error('Error creating table:', error);
            return;
        }
        console.log('Movies table created or already exists.');
        checkAndInsertBaseData();
    });
}

const checkAndInsertBaseData = () => {
    connection.query('SELECT COUNT(*) AS count FROM movies', (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            return;
        }
        const count = results[0].count;
        if (count === 0) {
            console.log('No movies found in the database. Inserting base data...');
            insertBaseData();
        } else {
            console.log(`Found ${count} movies in the database.`);
        }
    });

    const insertBaseData = () => {
        moviesInFile.movies.forEach(movie => {
            connection.query('INSERT INTO movies SET ?', movie, (error, results) => {
                if (error) {
                    console.error('Error inserting movie:', error);
                } else {
                    console.log(`Inserted movie with ID ${results.insertId}`);
                }
            });
        });
        connection.end();
    }
}


createMoviesTable();
module.exports = connection;

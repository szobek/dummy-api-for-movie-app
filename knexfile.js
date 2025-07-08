import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    client: 'mysql2', 
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'ushaeW3.',
      database: 'movie_db',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
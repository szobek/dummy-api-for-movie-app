/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('movies', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.integer('year').notNullable();
    table.float('rating').notNullable();
    table.string('director').notNullable().defaultTo('Unknown');
    table.text('description').notNullable();
    table.string('poster_url').notNullable().defaultTo('https://via.placeholder.com/300');
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movies');
};


/*

írj olyan mysql lekérdezést ami 5 táblából veszi az adatot. Minden adat csak egyszer szerepeljen. 
A táblák:
 movies - oszlopai: id, title, year, rating, director, description, poster_url
 genres - oszlopai: id, name, description, created_at, updated_at
 movie-genre - oszlopai: id, movie_id, genre_id, created_at, updated_at
movie-actors - oszlopai: id, movie_id, actor_id 
actors - oszlopai: id, fullName, bio, sex, date_of_birth
*/
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
    table.string('poster_url').notNullable().defaultTo('https://picsum.photos/200/300');
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



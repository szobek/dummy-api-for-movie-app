/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('actors', table => {
        table.increments('id').primary();
        table.string('fullName').notNullable();
        table.string('bio').notNullable();
        table.string('sex').notNullable();
        table.date('date_of_birth').notNullable();
        table.timestamps(true, true); // created_at and updated_at timestamps
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
return knex.schema.dropTableIfExists('actors');
};

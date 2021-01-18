import Knex from 'knex';

// Ambos os metodos abaixo sao necessarios e precisam ter o nome que tem
// faz alterações no banco
export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        //campos da tabela do banco
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
        
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    });
}

// desfaz alterações no banco
export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
}
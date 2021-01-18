import Knex from 'knex';

// Ambos os metodos abaixo sao necessarios e precisam ter o nome que tem
// faz alterações no banco
export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        //campos da tabela do banco
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable(); 

    });
}

// desfaz alterações no banco
export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}
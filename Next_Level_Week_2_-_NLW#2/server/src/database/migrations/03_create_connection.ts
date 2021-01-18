// guarda todas as conexões feitas, com quais professores e quando==> conexão na aplicação seria quando o usuario clica no link de contato para um professor
import Knex from 'knex';

// Ambos os metodos abaixo sao necessarios e precisam ter o nome que tem
// faz alterações no banco
export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        //campos da tabela do banco
        table.increments('id').primary();
        
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP')) // salva o horario atual no campo
            .notNullable();

    });
}

// desfaz alterações no banco
export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}
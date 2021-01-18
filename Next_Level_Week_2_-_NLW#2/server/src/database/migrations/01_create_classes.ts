import Knex from 'knex';

// Ambos os metodos abaixo sao necessarios e precisam ter o nome que tem
// faz alterações no banco
export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        // campos da tabela do banco
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        // fazendo os relacionamentos a partir da criação de um novo campo na tabela
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE') // deleta todas as aulas dadas por um professor deletado da aplicação
            .onUpdate('CASCADE'); // caso o professor sofra alguma alteração em seu id, por exemplo, a tabela de classes é interamente atualizada para as materias relacionadas a esse prof
    });
}

// desfaz alterações no banco
export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
}
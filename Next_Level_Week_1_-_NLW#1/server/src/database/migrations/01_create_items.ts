import Knex from 'knex';

// funcoes que devem conter nos arquivos referentes as tabelas do banco
export async function up(knex: Knex) {  //realiza as alterações no banco
    // criar a tabela
    return knex.schema.createTable('items', table => { // table é o campo identificador da tabela
        // adição dos campos da tabela
        table.increments('id').primary(); //primary especifica que o id é a chave primaria dessa tabela
        table.string('image').notNullable();
        table.string('title').notNullable();
        
    });
}

export async function down(knex: Knex) {
    // voltar atras (deletar a tabela): pode retirar campos da tabela
    return knex.schema.dropTable('items');

}
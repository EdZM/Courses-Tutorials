// funcoes que devem conter nos arquivos referentes as tabelas do banco e que sao chamadas pelo KNEX

import Knex from 'knex'; // importando o TIPO da variavel knex com K maiusculo

// funções para realizar as alterações no banco

// funções chamadas pelo proprio knex
export async function up(knex: Knex){  // o : especifica o tipo da variavel knex(com k minusculo)
    // criar a tabela
    // digite Knex. e veja as possiveis funções associadas ao knex. Isso é fornecido pela inteligencia da IDE
    return knex.schema.createTable('points', table => { // table é o campo identificador da tabela
        // adição dos campos da tabela
        table.increments('id').primary(); //primary especifica que o id é a chave primaria dessa tabela
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); //o 2 especifica que o campo uf terá somente 2 caracteres
    });


}

export async function down(knex: Knex) { 
    // voltar atras (deletar a tabela): pode retirar campos da tabela
    return knex.schema.dropTable('points');

}
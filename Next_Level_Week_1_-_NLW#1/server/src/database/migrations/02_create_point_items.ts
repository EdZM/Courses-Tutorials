import Knex from 'knex';

// funcoes que devem conter nos arquivos referentes as tabelas do banco
export async function up(knex: Knex) {  //realiza as alterações no banco
    // criar a tabela
    return knex.schema.createTable('point_items', table => { // table é o campo identificador da tabela
        // adição dos campos da tabela
        table.increments('id').primary(); //primary especifica que o id é a chave primaria dessa tabela
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points')  // o campo point_id cria uma chave extrangeira no campo id da tabela points
                                // todo point_id precisa ser um id valido da tabela points
        
        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');

    });
}

export async function down(knex: Knex) {
    // voltar atras (deletar a tabela): pode retirar campos da tabela
    return knex.schema.dropTable('point_items');

}
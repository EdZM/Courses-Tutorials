
exports.up = function(knex) { //o metodo up é responsavel pela criação da tabela
    return knex.schema.createTable('ongs', function(table){ // criação da tabela ongs
        table.string('id').primary(); //  o id é a chave primária da tabela de ong
            table.string('name').notNullable(); // o campo nome, assim como os demais não podem ficar vazios
            table.string('email').notNullable();
            table.string('whatsapp').notNullable();
            table.string('city').notNullable();
            table.string('uf', 2).notNullable(); // é conhecido que a uf terá apenas dois caracteres.
      
  });
};

exports.down = function(knex) { // caso seja preciso voltar atrás na criação da tabela
    return knex.schema.dropTable('ongs');
};

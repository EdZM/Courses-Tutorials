
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){ // criação da tabela ongs
        table.increments(); //  cada vez que um caso é adicionado a chave primária é auto incrementada
        table.string('title').notNullable(); 
        table.string('description').notNullable();
        table.decimal('value').notNullable(); 
      
        table.string('ong_id').notNullable(); // coluna que tem relação com a tabela de ongs
    
        table.foreign('ong_id').references('id').inTable('ongs'); // criação da chave extrangeira que referencia o campo/coluna id da tabela ongs
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};

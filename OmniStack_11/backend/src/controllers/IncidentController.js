const connection = require('../database/connections');

module.exports = {
    async index(request, response){
        const incidents = await connection('incidents').select('*');

        return response.json(incidents);

    }, 
    
    
    
    async create(request, response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({ //o primeiro caso será armazenado na variavel id
            title,
            description,
            value,
            ong_id,
        });
    
    
        return response.json({id});
    },

    async delete(request, response) {
        const { id } = request.params; 
        const ong_id = request.headers.authorization; // necessario verificar se o id da ong já foi cadastrado

        const incident = await connection('incidents')
            .where('id', id) // busca o id ==> onde 'id' é id 
            .select('ong_id') 
            .first(); // retorna apenas um resultado
    
        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted'}); //retorna o codigo 401 === nao autorizado
        }
        
        await connection('incidents').where('id', id).delete(); //deleta o registro da tabela do banco de dados

        return response.status(204).send(); //retorna resposta sem conteudo, mas que foi bem sucedida

    }





}
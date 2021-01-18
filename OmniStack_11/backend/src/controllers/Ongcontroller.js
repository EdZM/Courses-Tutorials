const connection = require('../database/connections');
const crypto = require('crypto'); // possui metodos para geração de strings aleatorias 


module.exports = {
    async index(request, response)  {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },
    
    
    
    async create(request, response) {
        // app.get('/users', (request, response) => {
        // const params = request.query; // armazena os parametros contidos na url apos o "?". Ex.: /users?name=Eduardo ==> params terá: {name: Eduardo}
        // const params = request.params; // retorna o parametro id 
        const { name, email, whatsapp, city, uf } = request.body; //pega o corpo da requisição

        const id = crypto.randomBytes(4).toString('HEX'); // cria um id de 4bytes aleatorio em formato hexadecimal que será usado pela ong para se conectar com a aplicação

        await connection('ongs').insert({ // o retorno dessa funcão só acontece depois que esse trecho de 
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });

    }
}
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index(request, response){
        const {latitude, longitude, techs} = request.query;
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: { // pode receber varios filtros
                $in: techsArray, // $in é um operador lógico do Mongo. Tecnologias contidas no techsArray
            },
            location:{
                $near:{
                    $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //em metros
                },
            },
    
        });

        // console.log(techsArray);
        // buscar todos os devs num raio de 10km
        // filtro por tecnologias
        return response.json({ devs });


    },

    async update(){

    },

    async delete(){
        
    },


}
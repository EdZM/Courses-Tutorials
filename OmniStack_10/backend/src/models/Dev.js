// criando os modelos de entidade do banco de dados

const mongoose = require('mongoose'); // vou precisar informar qual o formato que o dev tem que ter na base de dados
const PointSchema = require('./utils/PointSchema');


const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], // vetor de strings
    location: {
        type: PointSchema,
        index: '2dsphere' //esfera 2D

    }

});

module.exports = mongoose.model('Dev', DevSchema);

// com isso o model já deve estar funcional
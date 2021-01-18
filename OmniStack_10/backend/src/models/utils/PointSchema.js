const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: { // esse formato consta na documentação do Mongoose
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },

});

module.exports = PointSchema;
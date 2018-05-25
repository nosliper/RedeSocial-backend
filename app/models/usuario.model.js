let mongoose = require('mongoose');

module.exports = function() {
    let schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        senha: {
            type: String,
            required: true
        }
    });

    return mongoose.model('Usuario', schema);
}();
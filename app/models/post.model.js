let mongoose = require('mongoose');

module.exports = function() {
    let schema = mongoose.Schema({
        texto: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            required: true
        },
        uid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    });
    return mongoose.model('Post', schema);
}();
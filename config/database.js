let mongoose = require('mongoose');

module.exports = function(uri) {
    mongoose.connect(uri);
    mongoose.connection.on('connected', function() {
        console.log("Mongoose: connected to " + uri);
    });
    mongoose.connection.on('disconnected', function() {
        console.log("Mongoose: disconnected from " + uri);
    });
    mongoose.connection.on('error', function(error) {
        console.log("Mongoose: connection error: " + error);
    });
    mongoose.set('debug', true);
}
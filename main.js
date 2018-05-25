let http = require('http');
let express = require('./config/express');
let db = require('./config/database');

let app = express();

http.createServer(app).listen(app.get('port'), function() {
        console.log("Server listening on localhost:" + app.get('port'));
    }
);

db('mongodb://localhost:27017/redesocialdb');
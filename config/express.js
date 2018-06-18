let express = require('express');
let parser = require('body-parser');
let path = require('path');

let usuarioRoute = require('../app/routes/usuario.route');
let postRoute = require('../app/routes/post.route');

module.exports = function() {
    let app = express();
    app.set('port', 3000);
    app.use(express.static('./public'));
    app.use(parser.json());
    app.use(parser.urlencoded({extended: false}));
    
    app.options('/api/*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.sendStatus(200);
        next();
    });
    
    usuarioRoute(app);
    postRoute(app);
    
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    return app;
}
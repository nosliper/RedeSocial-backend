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
    
    usuarioRoute(app);
    postRoute(app);

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    return app;
}
let Usuario = require('../models/usuario.model');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const SECRET_KEY = "aintnorestforthewicked"

module.exports.signin = function(req, res) {
    let promise = Usuario.findOne({'email': req.body.email}).exec();
    promise.then(
        function(usuario) {
            if(bcrypt.compareSync(req.body.senha, usuario.senha)) {
                let token = jwt.sign({id: usuario._id}, SECRET_KEY);
                res.status(200).json({token: token});
            }
            else {
                res.status(401).send("Invalid login");
            }
        })
    .catch(
        function(error) {
            res.status(401).send("Invalid login");
        }
    );
}

module.exports.checkToken = function(req, res, next) {
    jwt.verify(req.query.token, SECRET_KEY, function(error, decoded) {
        if(error) {
            res.status(401).send("Not authorized");
        }
        else {
            next();
        }
    });
}
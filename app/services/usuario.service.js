let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports.successCallback = function(res, status = 200) {
    return function(body) {
        let ret = [];
        if(body instanceof Array) {
            for(let i in body) {
                ret.push({
                    _id: body[i]._id,
                    nome: body[i].nome,
                    email: body[i].email
                });
            }
        }
        else {
            ret = body && {
                _id: body._id,
                nome: body.nome,
                email: body.email
            } || undefined;
        }
        res.status(status).json(ret);
    }
}

module.exports.errorCallback = function(res, msg = undefined, status = 500) {
    return function(error) {
        res.status(status).send((msg && msg || error));
    }
}

module.exports.generateUser = function(body, includeID = false) {
    let usuario = {};
    if(body.nome) {
        usuario.nome = body.nome;
    }
    if(body.email) {
        usuario.email = body.email;
    }
    if(body.senha) {
        usuario.senha = bcrypt.hashSync(body.senha, 10);
    }
    return usuario;
}

module.exports.checkPermission = function(req) {
    let token = req.query.token;
    let payload = jwt.decode(token);
    return token && payload.id === req.params.id;
}
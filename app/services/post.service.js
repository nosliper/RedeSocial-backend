let jwt = require('jsonwebtoken');

module.exports.successCallback = function(res, status = 200) {
    return function(body) {
        let ret = [];
        if(body instanceof Array) {
            for(let i in body) {
                ret.push({
                    _id: body[i]._id,
                    texto: body[i].texto,
                    likes: body[i].likes
                });
            }
        }
        else {
            ret = body && {
                _id: body._id,
                texto: body.texto,
                likes: body.likes
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

module.exports.generatePost = function(req) {
    let payload = jwt.decode(req.query.token);
    return {
        texto: req.body.texto,
        likes: req.body.likes,
        uid: payload.id
    }
}

module.exports.checkPermission = function(req, id) {
    let token = req.query.token;
    let payload = jwt.decode(token);
    return payload.id == id; // '===' won't work here for some reason
}
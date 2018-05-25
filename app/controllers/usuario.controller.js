let Usuario = require('../models/usuario.model');
let Post = require('../models/post.model');

let successCallback = function(res, status = 200) {
    return function(body) {
        res.status(status).json(body);
    }
}

let errorCallback = function(res, msg = undefined, status = 500) {
    return function(error) {
        res.status(status).send((msg && msg + ": " || "") + error);
    }
}

module.exports.getUsuarios = function(req, res) {
    let promise = Usuario.find().populate('posts'); // populate currently not working
    let nome = new RegExp(req.query.nome, "i");
    let email = req.query.email;
    promise = req.query.nome && promise.find({'nome': nome}) || promise;
    promise = email && promise.find({'email': email}) || promise;
    promise.then(successCallback(res))
    .catch(errorCallback(res));
}

module.exports.getUsuarioById = function(req, res) {
    let id = req.params.id;
    let promise = Usuario.findById(id).exec();
    promise.then(successCallback(res))
    .catch(errorCallback(res, "Could not find user", 404));
}

module.exports.insertUsuario = function(req, res) {
    let promise = Usuario.create(req.body);
    promise.then(successCallback(res, 201))
    .catch(errorCallback(res));
}

module.exports.editUsuario = function(req, res) {
    let id = req.params.id;
    let promise = Usuario.findByIdAndUpdate(id, req.body).exec();
    promise.then(successCallback(res))
    .catch(errorCallback(res, "Could not find user", 404));
}

module.exports.deleteUsuario = function(req, res) {
    let id = req.params.id;
    let promise = Usuario.findByIdAndRemove(id).exec();
    promise.then(successCallback(res))
    .catch(errorCallback(res));
}

// TODO: make this using '.populate('posts')' and send just the field
module.exports.getUsuarioPosts = function(req, res) {
    let id = req.params.id;
    let promise = Usuario.findById(id).exec();
    promise.then(
        function(usuario) {
            let promisePost = Post.find({'uid': id}).exec();
            promisePost.then(successCallback(res))
            .catch(errorCallback(res, "Error while trying to retrieve posts from user"));
        }
    )
    .catch(errorCallback(res, "Could not find user", 404));
}
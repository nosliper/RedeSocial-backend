let Usuario = require('../models/usuario.model');
let Post = require('../models/post.model');
let service = require('../services/usuario.service');

let success = service.successCallback;
let error = service.errorCallback;
let genUser = service.generateUser;
let checkPermission = service.checkPermission;

module.exports.getUsuarios = function(req, res) {
    let promise = Usuario.find();
    let nome = new RegExp(req.query.nome, "i");
    let email = req.query.email;
    promise = req.query.nome && promise.find({'nome': nome}) || promise;
    promise = email && promise.find({'email': email}) || promise;
    promise.then(success(res))
    .catch(error(res, "Could not find users"));
}

module.exports.getUsuarioById = function(req, res) {
    let id = req.params.id;
    let promise = Usuario.findById(id).exec();
    promise.then(success(res))
    .catch(error(res, "Could not find user", 404));
}

module.exports.insertUsuario = function(req, res) {
    let promise = Usuario.create(genUser(req.body));
    promise.then(success(res, 201))
    .catch(error(res, "Error while trying to create user"));
}

module.exports.editUsuario = function(req, res) {
    let id = req.params.id;
    if(checkPermission(req)) {
        let promise = Usuario.findByIdAndUpdate(id, genUser(req.body)).exec();
        promise.then(success(res))
        .catch(error(res, "Error while trying to edit user", 500));
    }
    else {
        error(res, "Not authorized", 401)();
    }
}

module.exports.deleteUsuario = function(req, res) {
    let id = req.params.id;
    if(checkPermission(req)) {
        let promise = Usuario.findByIdAndRemove(id).exec();
        promise.then(success(res))
        .catch(error(res, "Error while trying to delete user"));
    }
    else {
        error(res, "Not authorized", 401)();
    }
}

// TODO: make this using '.populate('posts')' and send just the field
module.exports.getUsuarioPosts = function(req, res) {
    let id = req.params.id;
    let promise = Usuario.findById(id).exec();
    promise.then(
        function(usuario) {
            let promisePost = Post.find({'uid': id}).exec();
            promisePost.then(
                function(body) {
                    let posts = []
                    for(let i in body) {
                        posts.push({
                            _id: body[i]._id,
                            texto: body[i].texto,
                            likes: body[i].likes
                        });
                    }
                    res.status(200).json(posts);
                }
            )
            .catch(error(res, "Error while trying to retrieve posts from user"));
        }
    )
    .catch(error(res, "Could not find user", 404));
}
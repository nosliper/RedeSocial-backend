let Post = require('../models/post.model');
let Usuario = require('../models/usuario.model');
let service = require('../services/post.service');

let success = service.successCallback;
let error = service.errorCallback;
let checkPermission = service.checkPermission;
let genPost = service.generatePost;

module.exports.getPosts = function(req, res) {
    let promise = Post.find().exec();
    promise.then(success(res, 200))
    .catch(error(res));
}

module.exports.getPostById = function(req, res) {
    let id = req.params.id;
    let promise = Post.findById(id).exec();
    promise.then(success(res, 200))
    .catch(error(res, "Could not find post or permission denied", 404));
}

module.exports.insertPost = function(req, res) {
    let promise = Post.create(genPost(req));
    promise.then(success(res, 201))
    .catch(error(res, "Error while trying to insert user"));
}

module.exports.editPost = function(req, res) {
    let id = req.params.id;
    let promise = Post.findById(id).exec();
    promise.then(function(post) {
        if (checkPermission(req, post.uid)) {
            let promiseEdit = Post.findByIdAndUpdate(id, genPost(req)).exec();
            promiseEdit.then(success(res))
            .catch(error(res, "Error while trying to update post"));
        }
        else {
            error(res, "Not authorized", 401)();
        }
    })
    .catch(error(res, "Could not find post", 404));
}

module.exports.deletePost = function(req, res) {
    let id = req.params.id;
    let promise = Post.findById(id).exec();
    promise.then(function(post) {
        if (checkPermission(req, post.uid)) {        
            let promiseRemove = Post.findByIdAndRemove(id).exec();
            promiseRemove.then(success(res))
            .catch(error(res, "Error while trying to delete post"));
        }
        else {
            error(res, "Not authorized", 401)();    
        }
    })
    .catch(error(res, "Could not find post", 404));
}

module.exports.getusuarioByPostId = function(req, res) {
    let id = req.params.id;
    let promise = Post.findById(id);
    promise.then(
        function(post) {
            let promiseUsuario = Usuario.findById(post.uid).exec();
            promiseUsuario.then(
                function(body) {
                    let usuario = {
                        _id: body._id,
                        nome: body.nome,
                        email: body.email
                    }
                    res.status(200).json(usuario);
                }
            )
            .catch(error(res, "Could not find user for given post"));
        }
    )
    .catch(error(res, "Could not find post", 404));
}
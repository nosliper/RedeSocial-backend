let Post = require('../models/post.model');
let Usuario = require('../models/usuario.model');

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

module.exports.getPosts = function(req, res) {
    let promise = Post.find().exec();
    promise.then(successCallback(res))
    .catch(errorCallback(res));
}

module.exports.getPostById = function(req, res) {
    let id = req.params.id;
    let promise = Post.findById(id).exec();
    promise.then(successCallback(res))
    .catch(errorCallback(res, "Could not find post", 404));
}

module.exports.insertPost = function(req, res) {
    let promise = Post.create(req.body);
    promise.then(successCallback(res, 201))
    .catch(errorCallback(res, "Error while trying to insert user"));
}

module.exports.editPost = function(req, res) {
    let id = req.params.id;
    let promise = Post.findByIdAndUpdate(id, req.body).exec();
    promise.then(successCallback(res))
    .catch(errorCallback(res, "Error while trying to update user"));
}

module.exports.deletePost = function(req, res) {
    let id = req.params.id;
    let promise = Post.findByIdAndRemove(id).exec();
    promise.then(successCallback(res))
    .catch(errorCallback(res, "Could not find post", 404));
}

module.exports.getusuarioByPostId = function(req, res) {
    let id = req.params.id;
    let promise = Post.findById(id);
    promise.then(
        function(post) {
            let promiseUsuario = Usuario.findById(post.uid).exec();
            promiseUsuario.then(successCallback(res))
            .catch(errorCallback(res, "Could not find user for given post"));
        }
    )
    .catch(errorCallback(res, "Could not find post", 404));
}
let postController = require('../controllers/post.controller');
let authController = require('../controllers/auth.controller');

module.exports = function(app) {
    app.use('/api/posts', authController.checkToken);
    app.get('/api/posts', postController.getPosts);
    app.get('/api/posts/:id', postController.getPostById);
    app.post('/api/posts', postController.insertPost);
    app.put('/api/posts/:id', postController.editPost);
    app.delete('/api/posts/:id', postController.deletePost);
    app.get('/api/posts/:id/usuario', postController.getusuarioByPostId);
}
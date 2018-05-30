let usuarioController = require('../controllers/usuario.controller');
let authController = require('../controllers/auth.controller');

module.exports = function(app) {
    app.post('/api/usuarios/signin', authController.signin);
    app.post('/api/usuarios', usuarioController.insertUsuario);
    app.use('/api/usuarios', authController.checkToken);
    app.get('/api/usuarios', usuarioController.getUsuarios);
    app.get('/api/usuarios/:id', usuarioController.getUsuarioById);
    app.put('/api/usuarios/:id', usuarioController.editUsuario);
    app.delete('/api/usuarios/:id/', usuarioController.deleteUsuario);
    app.get('/api/usuarios/:id/posts', usuarioController.getUsuarioPosts);
}
let usuarioController = require('../controllers/usuario.controller');

module.exports = function(app) {
    app.get('/api/usuarios', usuarioController.getUsuarios);
    app.get('/api/usuarios/:id', usuarioController.getUsuarioById);
    app.post('/api/usuarios', usuarioController.insertUsuario);
    app.put('/api/usuarios/:id', usuarioController.editUsuario);
    app.delete('/api/usuarios/:id/', usuarioController.deleteUsuario);
    app.get('/api/usuarios/:id/posts', usuarioController.getUsuarioPosts);
}
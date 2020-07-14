const {Router} = require('express');

const uploadConfig = require('./config/upload');

const multer = require('multer');

const upload = multer(uploadConfig);

const routes = new Router();

const authMiddleware = require('./app/midrewares/auth');

const UserController = require('./app/controllers/UserController');
const RoomController = require('./app/controllers/RoomController');
const MessageController = require('./app/controllers/MessageController');
const FavoriteController = require('./app/controllers/FavoriteController');
//http://localhost:3000/files/
//routes.use(authMiddleware);

routes.post('/user', upload.single('image'), UserController.store);
routes.get('/user', UserController.index);
routes.post('/login', UserController.login);

routes.post('/message', MessageController.store);
routes.get('/message', MessageController.index);
routes.get('/message/findMessages/:sala_id', MessageController.findMessages);

routes.post('/room', RoomController.store);
routes.get('/room/findSala/usuario1/:user1/usuario2/:user2', RoomController.findSala);
routes.get('/room', RoomController.index);
routes.get('/room/findAllRoom/:usuarioLogadoId', RoomController.findAllRoom)

routes.get('/findConnections/:id', UserController.findConnections);
routes.get('/findFavorites/:id', UserController.findFavorites);
routes.get('/user/:id', UserController.getById);
routes.post('/favorite', FavoriteController.store);

routes.get('/', (req, res) => {
    res.json({ok: true});
});

module.exports = routes;
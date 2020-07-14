require('dotenv').config();

const express = require('express');

const routes = require('./routes');

const morgan = require('morgan');

const path = require('path');

const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

const server = require('http').Server(app);

const io = require('socket.io').listen(server);

const { addUser, getUser, findAll, removeUser } = require('./app/user');

const socketManager = require('./SocketManager')

require('./app/database');

module.exports = io;

io.on('connection', socketManager);

app.use(bodyParser.json());

app.use(cors());

app.use(routes);

app.use(morgan('dev'));

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(express.urlencoded({ extended: false }));

server.listen(3333);
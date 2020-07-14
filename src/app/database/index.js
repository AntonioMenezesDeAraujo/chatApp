const Sequelize = require('sequelize');

const User = require('../models/User');
const Message = require('../models/Message');
const Room = require('../models/Room');
const Favorite = require('../models/Favorite');

const databaseConfig = require('../../config/database');

const models = [User, Message, Room, Favorite];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
    }
}

module.exports = new Database();
const Message = require('../models/Message');

const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

const config = require('../../config/database');

const sequelize = new Sequelize(config)

class MessageController {
    async store(req, res) {
        const message = await Message.create(req.body);
        return res.json(message);
    }

    async index(req, res) {
        const messages = await Message.findAll({ where: { room_id: req.headers.room_id } });
        return res.json(messages);
    }

    async findMessages(req, res) {
        const response = await sequelize.query(
            "   select m.*, u_origem.nome as nome_origem, u_origem.key as avatar_origem, u_destino.nome as nome_destino, u_destino.key as avatar_destino "
            + " from messages m "
            + " inner join users u_origem on m.usuario_origem_id  = u_origem.id "
            + " inner join users u_destino on m.usuario_destino_id  = u_destino.id "
            + " where room_id = " + req.params.sala_id +"order by created_at DESC",
            {
                type: QueryTypes.SELECT
            }
        );
        
        return res.json(response ? response : new Object() );
    }
}

module.exports = new MessageController();
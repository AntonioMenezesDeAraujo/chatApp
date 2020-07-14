const Room = require('../models/Room');

const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

const config = require('../../config/database');

const sequelize = new Sequelize(config)


class RoomController {
    async store(req, res) {
        const room = await Room.create(req.body);
        return res.json(room);
    }

    async index(req, res) {
        const users = await User.findAll({
            where: Sequelize.and({ excluido: false }, Sequelize.or(
                {
                    usuario_criador_id: req.headers.useId
                },
                {
                    usuario_remetente_id: req.headers.useId
                }
            ))
        });
        return res.json(users);
    }

    async findSala(req, res) {
        const response = await sequelize.query(
            "select * from rooms where usuario_criador_id in (" + req.params.user1 + " , " + req.params.user2 + ") and usuario_remetente_id in(" + req.params.user1 + " , " + req.params.user2 + ")",
            {
                type: QueryTypes.SELECT
            }
        );

        return res.json(response[0] ? response[0] : new Object());
    }

    async findAllRoom(req, res) {
        const response = await sequelize.query(
            " select r.id as idRoom, " +
            " case when u_criador.id = :userLogadoId then u_remetente.apelido else  u_criador.apelido end as nome, " +
            " case when u_criador.id = :userLogadoId then u_remetente.key else  u_criador.key end as avatar, " +
            " case when u_criador.id = :userLogadoId then u_remetente.id else  u_criador.id end as idsuarioConversa, " +
            " ms.texto as ultimamsg,  " +
            " true as visualizado, true as enviado, ms.created_at as horario, 3 as totalNaoLido " +
            " from rooms r " +
            " left join lateral( " +
            " select texto, created_at " +
            " from messages m " +
            " where m.room_id = r.id " +
            " order by created_at desc limit 1 " +
            " ) ms on true " +
            " inner join users u_remetente on u_remetente.id = usuario_remetente_id " +
            " inner join users u_criador on u_criador.id = usuario_criador_id " +
            " where (usuario_criador_id = :userLogadoId or usuario_remetente_id = :userLogadoId) ",
            {
                replacements: { 'userLogadoId': req.params.usuarioLogadoId },
                type: QueryTypes.SELECT
            }
        );
        
        return res.status(200).json({ room: response });
    }
}

module.exports = new RoomController();
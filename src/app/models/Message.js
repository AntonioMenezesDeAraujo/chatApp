const Sequelize = require('sequelize');

class Messages extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            texto: Sequelize.STRING,
            data_envio: Sequelize.DATE,
            data_visualizacao: Sequelize.DATE,
            enviado: Sequelize.BOOLEAN,
            usuario_origem_id: Sequelize.BIGINT,
            usuario_destino_id: Sequelize.BIGINT,
            room_id: Sequelize.BIGINT,
            visualizado: Sequelize.BOOLEAN,
            nome_origem: Sequelize.STRING,
            nome_destino: Sequelize.STRING,
            avatar_origem: Sequelize.STRING,
            avatar_destino: Sequelize.STRING
        }, {
                sequelize
            });
        return this;
    }

    associate(models) {
        Message.belongsTo(models.Room, { foreignKey: 'room_id', as: 'room' });
        Message.belongsTo(models.User, { foreignKey: 'usuario_origem_id', as: 'usuarioOrigem' });
        Message.belongsTo(models.User, { foreignKey: 'usuario_destino_id', as: 'usuarioDestino' });
    }
}

module.exports = Messages;
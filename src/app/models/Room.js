const Sequelize = require('sequelize');

class Rooms extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            usuario_criador_id: Sequelize.BIGINT,
            usuario_remetente_id: Sequelize.BIGINT,
            excluido_usuario_criador:Sequelize.BOOLEAN,
            excluido_usuario_remetente:Sequelize.BOOLEAN,

            //Campos transients
            idRoom: Sequelize.BIGINT,
            nome: Sequelize.STRING,
            avatar: Sequelize.STRING,
            ultimamsg: Sequelize.STRING,
            visualizado: Sequelize.BOOLEAN,
            enviado: Sequelize.BOOLEAN,
            horario: Sequelize.DATE,
            totalNaoLido: Sequelize.INTEGER,
            idsuarioConversa: Sequelize.BIGINT,
        },{
            sequelize
        });
        return this;
    }

    associate(models) {
        Room.belongsTo(models.User, {foreignKey: 'usuario_criador_id', as: 'userCriador'});
        Room.belongsTo(models.User, {foreignKey: 'usuario_remetente_id', as: 'usuarioRemetente'});
    }
}

module.exports = Rooms;
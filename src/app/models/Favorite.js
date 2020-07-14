const Sequelize = require('sequelize');

class Favorite extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            solicitante_id: Sequelize.BIGINT,
            solicitado_id: Sequelize.BIGINT,
            ativo:Sequelize.BOOLEAN,
        },{
            sequelize
        });
        return this;
    }

    associate(models) {
        Favorite.belongsTo(models.User, {foreignKey: 'solicitante_id', as: 'solicitante'});
        Favorite.belongsTo(models.User, {foreignKey: 'solicitado_id', as: 'solicitado'});
    }
}

module.exports = Favorite;
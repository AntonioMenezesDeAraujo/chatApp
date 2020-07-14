const Sequelize = require('sequelize');

class Users extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                apelido: Sequelize.STRING,
                senha: Sequelize.STRING,
                url: Sequelize.STRING,
                key: Sequelize.STRING,
            }, {
                sequelize
            });
        return this;
    }

    associate(models) {
        User.hasMany(models.Message, { as: 'messages' });
        
        User.hasMany(models.Room, { as: 'rooms' });
        
        User.belongsToMany(models.User, {
            trough: 'Favorites',
            as: 'Favorites',
            foreignKey:'solicitante_id'
        });

        User.belongsToMany(models.User, {
            trough: 'Favorites',
            as: 'Favorites',
            foreignKey:'solicitado_id'
        });
    }
}

module.exports = Users;
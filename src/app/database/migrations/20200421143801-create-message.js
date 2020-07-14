'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },

        texto: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        data_envio: {
          type: Sequelize.DATE,
          allowNull: false
        },

        data_visualizacao: {
          type: Sequelize.DATE,
          allowNull: false
        },

        enviado: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },

        visualizado: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },

        usuario_origem_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },

        usuario_destino_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },

        room_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'rooms',
            key: 'id'
          }
        },

        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },

        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messages');
  }
};

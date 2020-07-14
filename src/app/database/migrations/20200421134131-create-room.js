'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rooms',
      {
        id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },

        usuario_criador_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },

        usuario_remetente_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },

        excluido_usuario_criador: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },

        excluido_usuario_remetente: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
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
    return queryInterface.dropTable('rooms');
  }
};

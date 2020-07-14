'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      apelido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      url: {
        type: Sequelize.STRING,
        allowNull: true
      },

      key: {
        type: Sequelize.STRING,
        allowNull: true
      },
      
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};

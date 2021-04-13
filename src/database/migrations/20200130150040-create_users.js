module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    usr_id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    usr_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    usr_email: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    usr_password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    usr_created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    usr_updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    usr_deleted_at: Sequelize.DATE,
  }, {
    engine: 'MyISAM',
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('users'),
};

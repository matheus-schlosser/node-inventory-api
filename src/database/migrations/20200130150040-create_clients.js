module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('clients', {
    cl_id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    cl_name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    cl_responsible: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    cl_phone: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    cl_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    cl_created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    cl_updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    cl_deleted_at: Sequelize.DATE,
  }, {
    engine: 'MyISAM',
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('clients'),
};

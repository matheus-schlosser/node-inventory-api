module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
    ord_id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    ord_cl_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    ord_pdt_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    ord_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ord_status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    ord_description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    ord_created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    ord_updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    ord_deleted_at: Sequelize.DATE,
  }, {
    engine: 'MyISAM',
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('orders'),
};

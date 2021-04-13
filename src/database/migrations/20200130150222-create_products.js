module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('products', {
    pdt_id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    pdt_cat_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    pdt_name: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    pdt_image: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    pdt_price: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    pdt_created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    pdt_updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    pdt_deleted_at: Sequelize.DATE,
  }, {
    engine: 'MyISAM',
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('products'),
};

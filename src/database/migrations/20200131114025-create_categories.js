module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('categories', {
    cat_id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    cat_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    cat_image: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    cat_created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    cat_updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    cat_deleted_at: Sequelize.DATE,
  }, {
    engine: 'MyISAM',
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('categories'),
};

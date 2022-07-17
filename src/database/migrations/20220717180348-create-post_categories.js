'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostCategories = queryInterface.createTable("PostCategories", {
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      }
    })
    return PostCategories
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('PostCategories');
  }
};

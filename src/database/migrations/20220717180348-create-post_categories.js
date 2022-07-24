'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostCategories = await queryInterface.createTable("PostCategories", {
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'postId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'categoryId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      }
    })
    return PostCategories;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};

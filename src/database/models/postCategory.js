module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
        references: {
            model: 'BlogPosts',
            key: 'id'
        }
    }, 
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
        references: {
            model: 'Categories',
            key: 'id'
        }
    }},{
        timestamps: false,
        tableName: 'PostCategories'
    },
    );
    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
          as: 'categories',
          through: PostCategory,
          foreignKey: 'postId',
          otherKey: 'categoryId',
        });
        models.Category.belongsToMany(models.BlogPost, {
          as: 'blogposts',
          through: PostCategory,
          foreignKey: 'categoryId',
          otherKey: 'postId',
        });
      };

    return PostCategory;
  };
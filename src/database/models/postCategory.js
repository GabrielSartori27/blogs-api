module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }, 
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }},{
        timestamps: false,
        tableName: 'PostCategories'
    },
    );
    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
          as: 'categories',
          through: PostCategory,
          foreignKey: 'id',
          otherKey: 'id',
        });
        models.Category.belongsToMany(models.BlogPost, {
          as: 'blogposts',
          through: PostCategory,
          foreignKey: 'id',
          otherKey: 'id',
        });
      };

    return PostCategory;
  };
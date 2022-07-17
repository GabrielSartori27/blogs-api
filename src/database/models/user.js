const User = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      id: DataTypes.INTEGER,
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    }, {
        freezeTableName: true,
    });
    return User;
  };
  
  module.exports = User;
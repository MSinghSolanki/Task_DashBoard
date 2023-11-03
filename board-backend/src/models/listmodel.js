module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('List', {
        name: DataTypes.STRING,
      });
    return List;
  };
  

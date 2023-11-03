

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: DataTypes.STRING,
          completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
        });
    return Task;
  };
  
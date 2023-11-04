module.exports = (sequelize, DataTypes) => {
  const mapping_list = sequelize.define("mapping_list", {
    mapping_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    listing_id: {
      type: DataTypes.INTEGER,
    },
    task_id: {
      type: DataTypes.INTEGER,
    },
    is_deleted: {
      type: DataTypes.INTEGER
    }
  });

  return mapping_list;
};

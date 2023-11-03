const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.prototype.checkPassword = async function (password) {
    try {
      // Use bcrypt to compare the entered password with the hashed password
      console.log(this.password, password);
      const isPasswordValid = await bcrypt.compare(password, this.password);

      return isPasswordValid;
    } catch (error) {
      // Handle any potential errors during password comparison
      console.error("Error comparing passwords:", error);
      return false;
    }
  };
  return User;
};

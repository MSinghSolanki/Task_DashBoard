// Example userController.js
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const con = require("../config/connect.js")
const { DataTypes  } = require('sequelize');
const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
  };
  
  const register = async (name,email,password) => {
    try {
        const User = require('../models/usermodel.js')(con, DataTypes)
      // Check if the user already exists with the provided email
      let user = await User.findOne({ where: { email:email } });
  
      if (user) {
        return { message: "Please try  email" }
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user with the provided email and password
      const body = {
        name:name,
        email:email,
        password:hashedPassword
      }
      user = await User.create(body);
  console.log(user)
      // Generate a token for the user
      const token = generateToken(user);
  
      // Associate the token with the user in your database (e.g., by storing it in a field)
      user.token = token;
      await user.save();
  
      // Return the user and the token
     
      return { user, token };
    } catch (err) {
        console.log(err)
     return {message:"Error Doing Registration"}
    }
  };
  
  const login = async (email, password) => {
    try {
      // Find the user with the provided email
      const User = require('../models/usermodel.js')(con, DataTypes)
      const user = await User.findOne({ where: {  email:email } });
  
      if (!user) {
        console.log(user)
        return { message: "Please try another email or password" }
      }
  
      // Check if the provided password matches the user's password
      const match = await user.checkPassword(password);
  
      if (!match) {
        console.log(match)
        return { message: "Please try another email or password" }
      }
  
      // Generate a token for the user
      const token = generateToken(user);
  
      // Return the user and the token
      return { user, token }
    } catch (err) {
        console.log(err)
      return false
    }
  };
  
  module.exports = { register, login };
  
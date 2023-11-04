require("dotenv").config();

// importing from library
const { body } = require("express-validator");

// importing connection
const { userMiddleWare, userController, validateStudentMiddle, validateStudentController } = require("../service/userService");

const create_users = [
    body("name").trim().isLength({ min: 1 }).withMessage("Invalid name length.").bail().isAlpha('en-US', { ignore: ' ' }).withMessage("Invalid name format."),
    body("email").trim().isLength({ min: 1 }).withMessage("Invalid email length.").bail().isEmail().withMessage("Invalid email format."),
    body("password").trim().isLength({ min: 5, max: 12 }).withMessage("Password length must be between 5 and 12 character"),
    userMiddleWare,
    userController
];

const login_user = [
    body("email").trim().isEmail().withMessage("Invalid login credentials."),
    body("password").trim().isLength({ min: 5, max: 12 }).withMessage("Invalid login credentials."),
    validateStudentMiddle,
    validateStudentController
]

module.exports = {
    create_users,
    login_user
}


require("dotenv").config();

const jwt = require("jsonwebtoken");
function createToken(id = 0, email = "") {
    const jwt_data = { expiresIn: process.env.JWT_TIME_OUT };
    const secret = process.env.JWT_SECRETE;
    const jwt_payload = { id, email }

    const auth_token = jwt.sign(jwt_payload, secret, jwt_data);

    return auth_token;
}

module.exports = {
    createToken
}
const jwt = require("jsonwebtoken");

const { mainResponse } = require("../globalResponse/apiResponse");

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    const secret = process.env.JWT_SECRETE || "";

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return mainResponse(res, 'failed', "User unauthorized.", [])
            }

            delete user.iat
            delete user.exp

            req.user = user;

            next();
        });
    } else {
        // return apiResponse.mainResponse(res, "unauthorized", "Unauthorized Error.", [{ 'token': "Token must be specified." }]);
        return mainResponse(res, "failed", "Authorization failed.", [])
        //res.sendStatus(401);
    }
};

module.exports = {
    authenticateJWT
}
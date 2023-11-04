
const { DataTypes } = require("sequelize");

// importing from master database
const master_data_base = require("../../../connection/masterDbConnection");

// import method or fucntion
const { mainResponse } = require("../../../helper/globalResponse/apiResponse");

async function userMiddleWare(req, res, next) {
    try {

        const { validationResponse } = require("../../../helper/globalResponse/validationResponse");
        const validationData = validationResponse(req);

        if (!validationData?.status) {
            return mainResponse(res, 'failed', validationData?.msg, validationData.data)
        }

        next();
    }
    catch (err) {
        return mainResponse(res, 'failed', err?.message, []);
    }
}
async function validateStudentMiddle(req, res, next) {
    try {

        const { validationResponse } = require("../../../helper/globalResponse/validationResponse");
        const validationData = validationResponse(req);

        if (!validationData?.status) {
            return mainResponse(res, 'failed', validationData?.msg, [])
        }

        next();
    }
    catch (err) {
        return mainResponse(res, 'failed', err?.message, []);
    }
}

async function userController(req, res) {
    try {

        const { name = "", email = "", password = "" } = req.body;

        const user = require("../../../models/usermodel")(master_data_base, DataTypes);

        const find_one_user = await user.findOne({ where: { email: email?.trim() } });


        if (find_one_user) {
            return mainResponse(res, "failed", "Email already exist.", []);
        }

        const user_obj = {
            name,
            email,
            password,
            is_deleted: 0
        }

        const create_user = await user.create(user_obj);

        const { createToken } = require("../../../helper/token/tokenCreation");
        const token = createToken(create_user?.user_id, create_user?.email);
        return mainResponse(res, 'success', 'Successfully loged in.', {
            token,
            user_data: {
                user_id: create_user.user_id,
                name: create_user.name,
                email: create_user.email
            }
        });
    }
    catch (err) {
        return mainResponse(res, "failed", err?.message, [])
    }
}
async function validateStudentController(req, res) {
    try {

        const { email = "", password = "" } = req.body;

        const user = require("../../../models/usermodel")(master_data_base, DataTypes);

        const find_one_user = await user.findOne({ email: email?.trim(), password: password?.trim() });

        if (!find_one_user) {
            return mainResponse(res, "failed", "No record found.", []);
        }

        const { createToken } = require("../../../helper/token/tokenCreation");
        const token = createToken(find_one_user?.user_id, find_one_user.email);
        return mainResponse(res, 'success', 'Successfully loged in.', {
            token,
            user_data: {
                user_id: find_one_user.user_id,
                name: find_one_user.name,
                email: find_one_user.email
            }
        });
    }
    catch (err) {
        return mainResponse(res, "failed", err?.message, [])
    }
}

module.exports = {
    userMiddleWare,
    userController,
    validateStudentMiddle,
    validateStudentController
}
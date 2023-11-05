
const { DataTypes } = require("sequelize");

// importing from master database
const master_data_base = require("../../../connection/masterDbConnection");

// import method or fucntion
const { mainResponse } = require("../../../helper/globalResponse/apiResponse");

async function taskCreationMiddleWare(req, res, next) {
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


async function moveTaskMiddleware(req, res, next) {
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


async function taskStausUpdateMiddleware(req, res, next) {
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


async function taskCreationController(req, res) {
    try {

        const { id = 0, email = "" } = req.user;
        let { task_title = "", task_description = "", list_id = 0, list_title = "" } = req.body;
        console.log("list_id : ", list_id);

        if (list_id) {
            const taskList = require("../../../models/listmodel")(master_data_base, DataTypes);
            const findTaskList = await taskList.findAll({ where: { listing_id: list_id, user_id: id } });

            if (findTaskList?.length > 1 || !findTaskList?.length) {
                return mainResponse(res, "failed", "Invalid list id provided or inaccurate listing.", []);
            }
        }

        if (!list_id) {
            const taskList = require("../../../models/listmodel")(master_data_base, DataTypes);
            const listing_obj = {
                user_id: id,
                is_deleted: 0,
                list_title: list_title
            }
            const create_listing = await taskList.create(listing_obj);
            console.log("create_listing : ", create_listing);
            list_id = create_listing?.listing_id;
        }

        const task_model = require("../../../models/taskmodel")(master_data_base, DataTypes);
        const task_obj = {
            title: task_title,
            description: task_description,
            is_completed: 0,
            id_deleted: 0
        }

        const task_creation = await task_model.create(task_obj);

        const mapping_model = require("../../../models/mappin_list")(master_data_base, DataTypes);
        const mapping_obj = {
            listing_id: list_id,
            task_id: task_creation.task_id
        }
        const mapping_creation = await mapping_model.create(mapping_obj);

        return mainResponse(res, 'success', "Task created successfully.", []);
    }
    catch (err) {
        return mainResponse(res, "failed", err?.message, [])
    }
}

async function taskListController(req, res) {
    try {
        const { id = 0, email = "" } = req.user;

        const list_query = `SELECT tl.listing_id AS 'listing_id', tl.list_title AS 'list_title', tasks.task_id AS 'task_id', tasks.title AS 'task_title', tasks.description AS 'task_description', tasks.is_completed AS 'task_status' FROM task_lists AS tl INNER JOIN mapping_lists AS ml ON tl.listing_id = ml.listing_id AND ml.is_deleted = 0 INNER JOIN tasks ON ml.task_id = tasks.task_id AND tasks.is_deleted = 0 WHERE tl.user_id = ${id} AND tl.is_deleted = 0;`
        const list_data = await master_data_base.query(list_query, { type: master_data_base.QueryTypes.SELECT });
        let task_list = {};
        list_data?.forEach((element) => {
            if (task_list[element?.listing_id]) {
                task_list[element?.listing_id].tasks.push({
                    task_id: element?.task_id,
                    task_title: element?.task_title,
                    task_description: element?.task_description,
                    task_status: element?.task_status
                })
            }
            else {
                task_list[element?.listing_id] = {
                    listing_id: element?.listing_id,
                    list_title: element?.list_title,
                    tasks: [
                        {
                            task_id: element?.task_id,
                            task_title: element?.task_title,
                            task_description: element?.task_description,
                            task_status: element?.task_status
                        }
                    ]
                }
            }
        });
        return mainResponse(res, "success", "List recived.", Object.values(task_list));
    }
    catch (err) {
        return mainResponse(res, "failed", err?.message, [])
    }
}
async function moveTaskController(req, res) {
    try {
        const { id = 0, email = "" } = req.user;
        const { destination_list_id = 0, task_id = 0 } = req.body;

        if (!destination_list_id || !task_id) {
            return mainResponse(res, "failed", "Invalid details provided.", []);
        }
        const mapping_list = require("../../../models/mappin_list")(master_data_base, DataTypes);
        const update_mapping = await mapping_list.update({ listing_id: destination_list_id }, { where: { task_id: task_id } })

        return mainResponse(res, "success", "List updated.", []);
    }
    catch (err) {
        return mainResponse(res, "failed", err?.message, [])
    }
}
async function taskStausUpdateController(req, res) {
    try {
        const { id = 0, email = "" } = req.user;
        const { task_id = 0, task_status = 0 } = req.body;

        if (!task_status || !task_id) {
            return mainResponse(res, "failed", "Invalid details provided.", []);
        }
        const task_models = require("../../../models/taskmodel")(master_data_base, DataTypes);

        let update_obj = {
            is_completed: 0
        }

        if (task_status) {
            update_obj = { is_completed: 1 }
        }
        const update_mapping = await task_models.update(update_obj, { where: { task_id: task_id } })

        return mainResponse(res, "success", "List updated.", []);
    }
    catch (err) {
        return mainResponse(res, "failed", err?.message, [])
    }
}



module.exports = {
    taskCreationMiddleWare,
    taskCreationController,
    taskListController,
    moveTaskMiddleware,
    moveTaskController,
    taskStausUpdateMiddleware,
    taskStausUpdateController
}
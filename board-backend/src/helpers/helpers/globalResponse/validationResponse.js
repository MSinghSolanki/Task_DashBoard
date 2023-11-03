// importing from library
const { validationResult } = require("express-validator");

// importing method / fucntions
const { functionResponse } = require("../../helpers/globalResponse/fucntionResponse");


/**
 * Validates the request parameters, body, and query.
 * @param {object} req - The request object containing the parameters, body, and query to be validated.
 * @returns {object} - The response object indicating the status of the validation and any error data.
 */
function validationResponse(req) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorData = errors.array().map((error) => {
                return { field: error.path, location: error.location, message: error.msg };
            });

            return functionResponse(false, "Body or Param or query validation failed.", errorData);
        }

        return functionResponse(true, "Body or Param or Query params validated successfully.", []);
    } catch (err) {
        return functionResponse(false, 'Body validation failed.', []);
    }
}


module.exports = { validationResponse };
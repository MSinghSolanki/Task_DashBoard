
/**
 * Returns a JSON response based on the provided parameters.
 * @param {object} res - The response object (optional, default: empty object).
 * @param {string} type - The status type of the response (optional, default: 'failed').
 * @param {string} message - The message to be included in the response (optional, default: empty string).
 * @param {array} data - The data to be included in the response (optional, default: empty array).
 * @returns {object} - The JSON response object with properties `status`, `message`, and `data`.
 */
function mainResponse(res = {}, type = 'failed', message = "", data = []) {
    let status = 200;
    let response_data = {
        status: type,
        message,
        data
    }
    if (type === 'success') {
        return res.status(status).json(response_data);
    }
    else if (type === 'failed') {
        return res.status(status).json(response_data);
    }

    status = 400;
    return res.status(status).json({ status: "failed", message: "Internal code error" });
}

module.exports = {
    mainResponse
}
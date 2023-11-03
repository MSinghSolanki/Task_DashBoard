/**
 * Returns a response object with the provided or default values.
 *
 * @param {boolean} [status=false] - The status of the response.
 * @param {string} [msg=""] - The message of the response.
 * @param {Array} [data=[]] - The data of the response.
 * @returns {Object} - The response object.
 */
function functionResponse(status = false, msg = "", data = []) {
    return { status, msg, data };
}

module.exports = { functionResponse }
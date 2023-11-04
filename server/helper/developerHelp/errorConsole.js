require('dotenv').config();

// accessing environment variables
const IS_CODING_ENV_DEV = process.env.CODING_ENV === 'dev' ? true : false;

/**
 * Logs an error message to the console in a development environment.
 * @param {Error} err - The error object to be logged. Default value is an empty object.
 * @param {string} function_name - The name of the function where the error occurred. Default value is an empty string.
 */
function errorConsoling(err = {}, function_name = "") {
    if (IS_CODING_ENV_DEV) {
        console.log(`-------------------------------${function_name}-------------------------------`);
        console.log("err:", err);
    }
}

module.exports = {
    errorConsoling
}
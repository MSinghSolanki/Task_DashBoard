require("dotenv").config();

// accessing environment variables
const IS_CODING_ENV_DEV = process.env.CODING_ENV == "dev" ? true : false;


/**
 * Checks the connection to a database and logs the result.
 * @param {Object} db - The database object to check the connection for.
 * @param {string} name - The name of the database (used for logging purposes).
 */
function connectionCheck(db, name) {
    db.authenticate().then(
        () => {
            console.log(`${name} Db connected successfully.....................`);
        }
    ).catch((err) => {
        console.log(`Unable to connect ${name} db............................`);
        IS_CODING_ENV_DEV && console.log("err : ", err);
    });
}

module.exports = {
    connectionCheck
}
const axios = require("axios");

// importing fucntion / method 
const { functionResponse } = require("../globalResponse/fucntionResponse");
const { errorConsoling } = require("../developerHelp/errorConsole");


/**
 * Makes an HTTP GET request to the specified API using Axios library.
 * Processes the response data and returns a formatted response.
 * @param {string} api - The URL of the API to fetch data from.
 * @returns {Object} - The response object containing success status, message, and data.
 */
async function axiosGetData(api = "") {
    try {

        if (typeof api !== 'string' || api?.trim() === '') {
            return functionResponse(false, "Invalid API provided.", []);
        };

        const { data } = await axios.get(api);

        if (data[0].Status !== "Success") {
            return functionResponse(false, data[0]?.Message, []);
        }

        const final_data = data[0]?.PostOffice?.map((ele) => {
            return {
                post_office: ele.Name,
                picode: ele.Pincode,
                district: ele?.District,
                block: ele?.Block
            }
        })

        return functionResponse(true, data[0]?.Message, final_data);
    }
    catch (err) {
        errorConsoling(err, axiosGetData.name);
        return functionResponse(false, `${err.message}`, []);
    }
}

module.exports = {
    axiosGetData
}
"use strict";
const { addEmployerDetails } = require("./addEmployerDetails");
const { addCompanyDetails } = require("./addCompanyDetails");
function handle_request(msg, callback) {
    switch (msg.route) {
        case "addEmployerDetails":
            addEmployerDetails(msg,callback);
            break;
        case "addCompanyDetails":
            addCompanyDetails(msg,callback);
            break;       
    }
}

exports.handle_request = handle_request;
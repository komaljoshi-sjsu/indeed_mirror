"use strict";
const { addEmployerDetails } = require("./addEmployerDetails");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "addEmployerDetails":
            addEmployerDetails(msg,callback);
            break;
        
    }
}

exports.handle_request = handle_request;
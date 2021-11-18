"use strict";
const { getAllUsrReviews } = require("./getAllUsrReviews");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "getAllUsrReviews":
            getAllUsrReviews(msg,callback);
            break;
        
    }
}

exports.handle_request = handle_request;
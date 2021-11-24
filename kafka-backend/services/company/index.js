"use strict";
const { getCompanyDetails } = require("./getCompanyDetails");
const { getCompanyDetailsPaginated } = require("./getCompanyDetailsPaginated");
function handle_request(msg, callback) {
    switch (msg.route) {
        case "getCompanyDetails":    
            getCompanyDetails(msg,callback); 
            break;
        case "getCompanyDetailsPaginated":    
            getCompanyDetailsPaginated(msg,callback); 
            break;
           
    }
}

exports.handle_request = handle_request;
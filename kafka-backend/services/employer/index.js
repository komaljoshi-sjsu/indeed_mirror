"use strict";
const { addEmployerDetails } = require("./addEmployerDetails");
const { addCompanyDetails } = require("./addCompanyDetails");
const { addCompanyIdToEmployer } = require("./addCompanyIdToEmployer");
const { editEmployerDetails } = require("./editEmployerDetails");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "addEmployerDetails":
            addEmployerDetails(msg,callback);
            break;
        case "addCompanyDetails":
            addCompanyDetails(msg,callback);
            break;  
        case "addCompanyIdToEmployer":
            addCompanyIdToEmployer(msg,callback);
            break;  
        case "editEmployerDetails":    
            editEmployerDetails(msg,callback); 
            break;       
            
    }
}

exports.handle_request = handle_request;
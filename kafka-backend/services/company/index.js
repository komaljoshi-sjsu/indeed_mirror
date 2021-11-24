"use strict";
const { getCompanyDetails } = require("./getCompanyDetails");
const { getCompanyDetailsPaginated } = require("./getCompanyDetailsPaginated");
const { searchAdminCompany } = require("./searchAdminCompany");
const { companyJobStatistics } = require("./companyJobStatistics");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "getCompanyDetails":    
            getCompanyDetails(msg,callback); 
            break;
        case "getCompanyDetailsPaginated":    
            getCompanyDetailsPaginated(msg,callback); 
            break;
        case "searchAdminCompany":    
            searchAdminCompany(msg,callback); 
            break; 
        case "companyJobStatistics":    
            companyJobStatistics(msg,callback); 
            break;  
    }
    
}

exports.handle_request = handle_request;
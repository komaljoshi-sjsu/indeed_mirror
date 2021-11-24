// search company details using company name for admin page 
"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
let searchAdminCompany = async (req, callback) => {
    try {
        let response = {}
        const searchTerm = "%"+req.query.data+"%"
        const query = "SELECT * FROM Company WHERE companyName LIKE ?";
        conn.query(query, [searchTerm], (error, rows) => {
            if (error) {
                callback(null,error)
            } else{
                response.companyDtls = rows;
                callback(null,response)
            }
        });
        
    } catch(err) {     
        callback('Cannot get company',err);
    }
};
exports.searchAdminCompany = searchAdminCompany;


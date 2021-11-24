// get company details for admin page 
"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
let getCompanyDetails = async (req, callback) => {
    try {
        let sql1 = "SELECT * FROM Company";
        conn.query(sql1, (error, result) => {
            if (error) {
                callback(null,error)
            }
           
            callback(null,JSON.stringify(result));
        });
       
  
    } catch(err) {
        
        callback('Cannot get company',err);
    }

};
exports.getCompanyDetails = getCompanyDetails;




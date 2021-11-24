// search company details using company name for admin page 
"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
let companyJobStatistics = async (req, callback) => {
    try {
        let response = {}
        const companyId= Number(req.query.data)
        const hired = "Hired";
        const reject = "Rejected"
        const countQuery = "SELECT COUNT(*) as count, YEAR(appliedDate) as year FROM AppliedJobs WHERE companyId=? AND status=? GROUP BY YEAR(appliedDate)";
        conn.query(countQuery, [companyId,hired], (error, rows) => {
            if (error) {
                console.log(error)
                callback(null,error)
                //res.status(400).send("Error occured while retrieving company details");
            } else{
                conn.query(countQuery, [companyId,reject], function (err, rows2) {
                  if (err) {
                    console.log("Error occured while querying"+err);
                    callback(null,error)
                  }
                  response.hired = rows;
                  response.rejected = rows2;
                  callback(null,response)
                })
              }
        });
        
    } catch(err) {     
        callback('Cannot get company',err);
    }
};
exports.companyJobStatistics = companyJobStatistics;
// router.get("/companyJobStatistics", function (req, res) {
//     const companyId= Number(req.query.data)
//     const hired = "Hired";
//     const reject = "Rejected"
//     const countQuery = "SELECT COUNT(*) as count, YEAR(appliedDate) as year FROM AppliedJobs WHERE companyId=? AND status=? GROUP BY YEAR(appliedDate)";
//     connection.query(countQuery, [companyId,hired], (error, rows) => {
//         if (error) {
//             console.log(error)
//             res.status(400).send("Error occured while retrieving company details");
//         } else{
//             connection.query(countQuery, [companyId,reject], function (err, rows2) {
//               if (err) {
//                 console.log("Error occured while querying"+err);
//                 return res.status(400).send("Error occurred while retrieving pending reviews");
//               }
//               return res.status(200).json({ hired: rows, rejected:rows2});
//             })
//           }
//     });
// });

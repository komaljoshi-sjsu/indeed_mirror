// get reviews of companies for admin page 
"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
require('../../models/Photo');
const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");
let getAdminReviews = async (req, callback) => {
    try {
        let response = {}
        const params = JSON.parse(req.query.data)
        const postsPerPage = 5
        const currentPage = params.currentPage;
        const offset = 5*(currentPage-1)
        const condition = "PENDING_APPROVAL"
        const query = "SELECT r.*, c.companyName FROM Review r, Company c WHERE r.companyId = c.companyId and r.adminReviewStatus = ? order by r.postedDate LIMIT ?,?";
        const count = "SELECT COUNT(*) AS total FROM Review WHERE adminReviewStatus = ?";
        conn.query(query, [condition,offset,postsPerPage], function (err, rows) {
          if (err) {
            console.log("Error occured while querying"+err);
            callback(null,error)
          }
          else{
            conn.query(count, condition, function (err, rows2) {
              if (err) {
                console.log("Error occured while querying"+err);
                callback(null,error)
              }
              //console.log("server result" + rows);
              response.reviews = rows;
              response.count = rows2[0].total;
              callback(null,response)
              //return res.status(200).json({ reviews: rows, count:rows2[0].total});
            })
          }
        });
    } catch(err) {
        
        callback('Cannot get company reviews',err);
    }

};
exports.getAdminReviews = getAdminReviews;

// router.get("/api/getAdminReviews", async (req, res) => {
//   const params = JSON.parse(req.query.data)
//   const postsPerPage = 5
//   const currentPage = params.currentPage;
//   const offset = 5*(currentPage-1)
//   const condition = "PENDING_APPROVAL"
//   const query = "SELECT r.*, c.companyName FROM Review r, Company c WHERE r.companyId = c.companyId and r.adminReviewStatus = ? order by r.postedDate LIMIT ?,?";
//   const count = "SELECT COUNT(*) AS total FROM Review WHERE adminReviewStatus = ?";
//   conn.query(query, [condition,offset,postsPerPage], function (err, rows) {
//     if (err) {
//       console.log("Error occured while querying"+err);
//       return res.status(400).send("Error occurred while retrieving pending reviews");
//     }
//     else{
//       conn.query(count, condition, function (err, rows2) {
//         if (err) {
//           console.log("Error occured while querying"+err);
//           return res.status(400).send("Error occurred while retrieving pending reviews");
//         }
//         //console.log("server result" + rows);
//         return res.status(200).json({ reviews: rows, count:rows2[0].total});
//       })
//     }
//   });
// });

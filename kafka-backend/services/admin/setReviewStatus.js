// get company details for admin page 
"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");

let setReviewStatus = async (req, callback) => {
    try {
        let response = {}
        const {adminReviewStatus, reviewId} = req.body;
        const data = [adminReviewStatus, reviewId];
        console.log(req.body)
        
        const updateQuery = "update Review SET adminReviewStatus = ? WHERE reviewId = ?";
        conn.query(updateQuery, data, function (err, rows) {
          if (err) {
            console.log("Error occured while querying");
            callback(null,error)
          }
          response.reviews = rows;
          callback(null,response)
        });

    } catch(err) {
        callback('Cannot get company reviews',err);
    }
};
exports.setReviewStatus = setReviewStatus;


// router.post("/api/setReviewStatus", async (req, res) => {
//   const {adminReviewStatus, reviewId} = req.body;
//   const data = [adminReviewStatus, reviewId];
//   console.log(req.body)
//   const updateQuery = "update Review SET adminReviewStatus = ? WHERE reviewId = ?";
//   conn.query(updateQuery, data, function (err, rows) {
//     if (err) {
//       console.log("Error occured while querying");
//       return res.status(400).send("Error occurred while updating review status");
//     }
//     //console.log("server result" + rows);
//     return res.status(200).json({ reviews: rows});
//   });
    
// });
  
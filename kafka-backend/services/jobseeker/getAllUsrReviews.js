"use strict";
const conn = require("../../config/mysql_connection");
let getAllUsrReviews = async (req, callback) => {
    try {
        console.log('hey i am here to get reviews. Write a code for this route:',req.route);
        const query = "SELECT * FROM Review r";
        conn.query(query, null , function (err, rows) {
            if (err) {
                console.log("Error occured while querying");
                res.status(400).send("Error occurred while retrieving all the reviews");
            } else{
                console.log('sucessfully returning reviews:',rows)
                callback(null,{reviews: rows,code:'200'});
            }
        });
    } catch(err) {
        console.log('Cannot get user reviews',err)
        callback('Cannot get user reviews',err);
    }
};

exports.getAllUsrReviews = getAllUsrReviews;
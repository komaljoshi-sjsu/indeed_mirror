"use strict";
const conn = require("../../config/mysql_connection");

let setReviewStatus = async (req, callback) => {
  try {
    let response = {};
    let error = {};
    const { adminReviewStatus, reviewId } = req.body;
    const data = [adminReviewStatus, reviewId];

    const updateQuery =
      "update Review SET adminReviewStatus = ? WHERE reviewId = ?";
    conn.query(updateQuery, data, function (err, rows) {
      if (err) {
        console.log("Error occured while querying");
        error.status = 500;
        error.message = "Error occured while updating admin review status";
        error.data = err;
        callback(error, null);
      }
      response.status = 200;
      response.reviews = rows;
      callback(null, response);
    });
  } catch (err) {
    callback("Unable to update admin review status", err);
  }
};

exports.setReviewStatus = setReviewStatus;
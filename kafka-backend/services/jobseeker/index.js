"use strict";
const { getAllUsrReviews } = require("./getAllUsrReviews");
const { companyReviews } = require("./companyReviews");
const { companyReviewsPaginated } = require("./companyReviewsPaginated");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "getAllUsrReviews":
            getAllUsrReviews(msg,callback);
            break;
        case "companyReviews":
            companyReviews(msg,callback);
            break;
        case "companyReviewsPaginated":
            companyReviewsPaginated(msg,callback);
            break;
    }
}


exports.handle_request = handle_request;
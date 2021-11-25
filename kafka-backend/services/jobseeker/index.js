"use strict";
const { getAllUsrReviews } = require("./getAllUsrReviews");
const { companyReviews } = require("./companyReviews");
const { companyReviewsPaginated } = require("./companyReviewsPaginated");
const { companyReviewsRatingSort } = require("./companyReviewsRatingSort");
const {companyReviewsDateSort } = require("./companyReviewsDateSort");
const {companyReviewsHelpfulSort } = require("./companyReviewsHelpfulSort");
const {companyReviewsRatingFilter } = require("./companyReviewsRatingFilter");
const {companyReviewsRatingFilterTotal } = require("./companyReviewsRatingFilterTotal");
const {updateHelpfulCount } = require("./updateHelpfulCount");
const {saveReview } = require("./saveReview");
const {allReviews } = require("./allReviews");
const {searchReview } = require("./searchReview");
const {reviewsByProfile } = require("./reviewsByProfile");
const {reviewsByProfilePaginated } = require("./reviewsByProfilePaginated");

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
        case "companyReviewsRatingSort":
            companyReviewsRatingSort(msg,callback);
            break;
        case "companyReviewsDateSort":
            companyReviewsDateSort(msg,callback);
            break;  
        case "companyReviewsHelpfulSort":
            companyReviewsHelpfulSort(msg,callback);
            break;   
        case "companyReviewsRatingFilter":
            companyReviewsRatingFilter(msg,callback);
            break; 
        case "companyReviewsRatingFilterTotal":
            companyReviewsRatingFilterTotal(msg,callback);
            break; 
        case "updateHelpfulCount":
            updateHelpfulCount(msg,callback);
            break; 
        case "saveReview":
            saveReview(msg,callback);
            break;  
        case "allReviews":
            allReviews(msg,callback);
            break; 
        case "searchReview":
            searchReview(msg,callback);
            break; 
        case "reviewsByProfile":
            reviewsByProfile(msg,callback);
            break;
        case "reviewsByProfilePaginated":
            reviewsByProfilePaginated(msg,callback);
            break;
    }
}


exports.handle_request = handle_request;
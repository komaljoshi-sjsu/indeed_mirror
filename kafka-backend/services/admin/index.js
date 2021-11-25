"use strict";
const { getAdminPhotos } = require("./getAdminPhotos");
const { setPhotoStatus } = require("./setPhotoStatus");
const { getAdminReviews } = require("./getAdminReviews");
const { setReviewStatus } = require("./setReviewStatus");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "getAdminPhotos":    
            getAdminPhotos(msg,callback); 
            break;
        case "setPhotoStatus":    
            setPhotoStatus(msg,callback); 
            break; 
        case "getAdminReviews":    
            getAdminReviews(msg,callback); 
            break;  
        case "setReviewStatus":    
            setReviewStatus(msg,callback); 
            break; 
    }
    
}

exports.handle_request = handle_request;
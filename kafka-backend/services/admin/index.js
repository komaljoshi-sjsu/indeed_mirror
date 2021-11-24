"use strict";
const { getAdminPhotos } = require("./getAdminPhotos");
const { setPhotoStatus } = require("./setPhotoStatus");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "getAdminPhotos":    
            getAdminPhotos(msg,callback); 
            break;
        case "setPhotoStatus":    
            setPhotoStatus(msg,callback); 
            break;  
    }
}

exports.handle_request = handle_request;
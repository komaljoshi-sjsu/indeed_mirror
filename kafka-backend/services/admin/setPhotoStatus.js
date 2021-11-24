// get company details for admin page 
"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
require('../../models/Photo');
const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");
let setPhotoStatus = async (req, callback) => {
    try {
        let response = {}
        
        console.log(req.body)
        const { _id, photoAdminReviewedStatus } = req.body
        Photo.findByIdAndUpdate(_id, {
          $set: {
            photoAdminReviewedStatus: photoAdminReviewedStatus,
          },
        })
          .then((result) => {
            
            response.photos = result;
            callback(null,response)
           // return res.status(200).json({ photos: result })
          })
          .catch((err) => {
            console.log('Error occured while querying')
            callback(null,error)
          })
       
    } catch(err) {
        callback('Cannot get company',err);
    }
};
exports.setPhotoStatus = setPhotoStatus;


// router.post('/api/setPhotoStatus', async (req, res) => {
//   console.log(req.body)
//   const { _id, photoAdminReviewedStatus } = req.body
//   try {
//     Photo.findByIdAndUpdate(_id, {
//       $set: {
//         photoAdminReviewedStatus: photoAdminReviewedStatus,
//       },
//     })
//       .then((result) => {
//         console.log(result)
//         return res.status(200).json({ photos: result })
//       })
//       .catch((err) => {
//         console.log('Error occured while querying')
//         return res
//           .status(400)
//           .send('Error occurred while retrieving all photos')
//       })
//   } catch {
//     ;(err) => {
//       return res.status(400).json({ error: err })
//     }
//   }
// })
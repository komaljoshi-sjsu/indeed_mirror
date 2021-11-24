// get company details for admin page 
"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
require('../../models/Photo');
const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");
let getAdminPhotos = async (req, callback) => {
    try {
        let response = {}
        const query = JSON.parse(req.query.data)
        const photoAdminReviewedStatus = query.photoAdminReviewedStatus
        const postsPerPage = 5
        const currentPage = query.currentPage
        Photo.find({ photoAdminReviewedStatus: photoAdminReviewedStatus })
        .limit(postsPerPage)
        .skip(postsPerPage * (currentPage - 1))
        .then((result) => {
          Photo.find({ photoAdminReviewedStatus: photoAdminReviewedStatus })
            .count()
            .then((r1) => {
              //console.log(result)
              response.photos = result;
              response.count = r1;
              callback(null,response)
              //return res.status(200).json({ photos: result, count: r1 })
            })
        })
        .catch((err) => {
          console.log('Error occured while querying')
          callback(null,error)
          
        //   return res
        //     .status(400)
        //     .send('Error occurred while retrieving all photos')
        })
        
       
  
    } catch(err) {
        
        callback('Cannot get company',err);
    }

};
exports.getAdminPhotos = getAdminPhotos;


// router.get('/api/getAdminPhotos/', async (req, res) => {
//     const query = JSON.parse(req.query.data)
//     const photoAdminReviewedStatus = query.photoAdminReviewedStatus
//     const postsPerPage = 5
//     const currentPage = query.currentPage
//     try {
//       Photo.find({ photoAdminReviewedStatus: photoAdminReviewedStatus })
//         .limit(postsPerPage)
//         .skip(postsPerPage * (currentPage - 1))
//         .then((result) => {
//           Photo.find({ photoAdminReviewedStatus: photoAdminReviewedStatus })
//             .count()
//             .then((r1) => {
//               //console.log(result)
//               return res.status(200).json({ photos: result, count: r1 })
//             })
//         })
//         .catch((err) => {
//           console.log('Error occured while querying')
//           return res
//             .status(400)
//             .send('Error occurred while retrieving all photos')
//         })
//     } catch {
//       ;(err) => {
//         return res.status(400).json({ error: err })
//       }
//     }
//   })

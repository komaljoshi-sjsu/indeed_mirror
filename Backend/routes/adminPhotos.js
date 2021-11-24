const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Photo = mongoose.model('Photo')
const kafka = require('../kafka/client');
//const { checkAuth } = require("../config/passport");
router.get('/api/getAdminPhotos/', function (req, res) {
  console.log("getAdminPhotos.....")
   let msg = {};
   msg.route = "getAdminPhotos";
   msg.query = req.query;
   //msg = req.body;
   kafka.make_request("admin", msg, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
           console.log(results)
           res.status(200).json({ photos: results.photos, count: results.count })
           
       }
   });
});
router.post('/api/setPhotoStatus/', function (req, res) {
  console.log("setPhotoStatus.....")
   let msg = {};
   msg.route = "setPhotoStatus";
   msg.body = req.body;
   //msg = req.body;
   kafka.make_request("admin", msg, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
           console.log(results)
           res.status(200).json({ photos: results.photos })
           
       }
   });
});


module.exports = router

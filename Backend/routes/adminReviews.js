"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
const kafka = require('../kafka/client');
//const { checkAuth } = require("../config/passport");
router.get('/api/getAdminReviews', function (req, res) {
  console.log("getAdminReviews.....")
   let msg = {};
   msg.route = "getAdminReviews";
   msg.query = req.query;
   //msg = req.body;
   kafka.make_request("admin", msg, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
           res.status(200).json({ reviews: results.reviews, count:results.count});  
       }
   });
});
router.post('/api/setReviewStatus', function (req, res) {
  console.log("setReviewStatus.....")
   let msg = {};
   msg.route = "setReviewStatus";
   msg.body = req.body;
   //msg = req.body;
   kafka.make_request("admin", msg, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
          console.log("results****")
          console.log(results)
          return res.status(200).json({ reviews: results.reviews});
       }
   });
});


  
module.exports = router;
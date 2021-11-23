//job seeker API for viewing company reviews
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
const mongoose = require("mongoose");
const Company = mongoose.model("Company");

const mysql = require('mysql');
const http = require('http');
const url = require('url');
const kafka = require('../kafka/client');

router.get("/allCompanyReviewsPaginated", (req, res) => {

    let msg = {};
    msg.route = "allCompanyReviewsPaginated";
    msg.url = req.url;

    kafka.make_request("employer", msg, function (err, results) {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if (results.status === '200'){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            
            console.log("Review data : ",JSON.stringify(results.data));
            res.end(JSON.stringify(results.data));
            
        }
        else{
            res.writeHead(400,{
                'Content-Type' : 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });	
});

router.get("/allCompanyReviews", (req, res) => {

    let msg = {};
    msg.route = "allCompanyReviews";
    msg.url = req.url;

    kafka.make_request("employer", msg, function (err, results) {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if (results.status === '200'){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            
            console.log("Review data : ",JSON.stringify(results.data));
            res.end(JSON.stringify(results.data));
            
        }
        else{
            res.writeHead(400,{
                'Content-Type' : 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });	
});

router.post("/updateFeaturedReview", (req, res) => {
    
    let msg = {};
    msg.route = "updateFeaturedReviews";
    msg.body = req.body;

    kafka.make_request("employer", msg, function (err, results) {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else{
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            res.end("Featured review updated successfully");
        }
    });
});

module.exports = router;
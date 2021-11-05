//job seeker API for viewing company reviews
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Company = mongoose.model("Company");

const mysql = require('mysql');
const http = require('http');
const url = require('url');

router.get("/allReviews", (req, res) => {

    Company.find((error, data) => {
        if (error) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if(data.length > 0){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            console.log("Review data : ",JSON.stringify(data));
            res.end(JSON.stringify(data));
            
        }else{
            res.writeHead(400,{
                'Content-Type' : 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });	
});

router.post("/updateFeaturedReview", (req, res) => {
    
    let sql = 'UPDATE Review SET isFeatured = 1 WHERE reviewId = ?';
    let data = [req.body.reviewId];
    
    connection.query(sql, data, (err, results) => {
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
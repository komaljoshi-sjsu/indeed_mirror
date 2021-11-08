//job seeker API for viewing company reviews
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
const mongoose = require("mongoose");
const Company = mongoose.model("Company");

const mysql = require('mysql');
const http = require('http');
const url = require('url');

router.get("/allCompanyReviewsPaginated", (req, res) => {

    const queryObject = url.parse(req.url,true).query;
    const adminReviewStatus = 'APPROVED';
    const pageNumber = queryObject.currentPage;
    const limit = 5;
    const offset = (pageNumber - 1) * limit;
    console.log("pageNumber" +pageNumber);
    console.log("offset" +offset);
	let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.adminReviewStatus=? LIMIT ?,?' ;
    console.log(sql);
    connection.query(sql, [adminReviewStatus, offset, limit], (err, results) => {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if(results.length > 0){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            let reviewData = [];
            console.log(results.length);
            for(let i=0; i<results.length; i++){
            let reviewDetails = {
                reviewId: results[i].reviewId,
                reviewTitle : results[i].reviewTitle,
                companyName: results[i].companyName,
                reviewerRole : results[i].reviewerRole,
                city: results[i].city,
                state: results[i].state,
                postedDate : results[i].postedDate,
                rating : results[i].rating,
                reviewComments : results[i].reviewComments,
                pros : results[i].pros,
                cons : results[i].cons,
                ceoApprovalRating : results[i].ceoApprovalRating,
                howToPrepare : results[i].howToPrepare,
                noHelpfulCount : results[i].noHelpfulCount,
                yesReviewHelpfulCount: results[i].yesReviewHelpfulCount,
                isFeatured: results[i].isFeatured,
                adminReviewStatus: results[i].adminReviewStatus,
                jobSeekerId: results[i].jobSeekerId,
                companyId: results[i].companyId,
            };
            reviewData.push(reviewDetails);
        }
            console.log("Review data : ",JSON.stringify(reviewData));
            res.end(JSON.stringify(reviewData));
            
        }else{
            res.writeHead(400,{
                'Content-Type' : 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });	
});

router.get("/allCompanyReviews", (req, res) => {

    const queryObject = url.parse(req.url,true).query;
    const adminReviewStatus = 'APPROVED';
	let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.adminReviewStatus=?' ;
    console.log(sql);
    connection.query(sql, [adminReviewStatus], (err, results) => {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if(results.length > 0){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            let reviewData = [];
            console.log(results.length);
            for(let i=0; i<results.length; i++){
            let reviewDetails = {
                reviewId: results[i].reviewId,
                reviewTitle : results[i].reviewTitle,
                companyName: results[i].companyName,
                reviewerRole : results[i].reviewerRole,
                city: results[i].city,
                state: results[i].state,
                postedDate : results[i].postedDate,
                rating : results[i].rating,
                reviewComments : results[i].reviewComments,
                pros : results[i].pros,
                cons : results[i].cons,
                ceoApprovalRating : results[i].ceoApprovalRating,
                howToPrepare : results[i].howToPrepare,
                noHelpfulCount : results[i].noHelpfulCount,
                yesReviewHelpfulCount: results[i].yesReviewHelpfulCount,
                isFeatured: results[i].isFeatured,
                adminReviewStatus: results[i].adminReviewStatus,
                jobSeekerId: results[i].jobSeekerId,
                companyId: results[i].companyId,
            };
            reviewData.push(reviewDetails);
        }
            console.log("Review data : ",JSON.stringify(reviewData));
            res.end(JSON.stringify(reviewData));
            
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
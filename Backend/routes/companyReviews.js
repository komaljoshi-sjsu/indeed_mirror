//job seeker API for viewing company reviews
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");

const mysql = require('mysql');
const http = require('http');
const url = require('url');

router.get("/companyReviews", (req, res) => {

    const queryObject = url.parse(req.url,true).query;
	let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=1 order by r.postedDate' ;
    connection.query(sql, (err, results) => {
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
            let reviewData = []
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

router.post("/updateHelpfulCount", (req, res) => {

    console.log(req.body.yesReviewHelpfulCount);
    let sql = 'UPDATE Review SET yesReviewHelpfulCount = ?, noHelpfulCount = ? WHERE reviewId = ?';
    let data = [req.body.yesReviewHelpfulCount, req.body.noHelpfulCount, req.body.reviewId];
    
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
            res.end("Helpful count updated successfully");
        }
    });
});

router.post("/saveReview", (req, res) => {

    console.log(req.body);
    let sql = 'INSERT INTO Review(reviewTitle, reviewerRole, city, state, postedDate, rating, workHappinessScore, learningScore, appraisalScore, reviewComments, pros, cons, ceoApprovalRating, howToPrepare, noHelpfulCount, yesReviewHelpfulCount, isFeatured, adminReviewStatus, jobSeekerId, companyId ) VALUES (?,?,?,?,now(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ';
    let data = [req.body.reviewTitle, req.body.reviewerRole, req.body.city, req.body.state, req.body.rating, req.body.workHappinessScore, req.body.learningScore, req.body.appreciationScore, req.body.reviewComments, req.body.pros, req.body.cons, req.body.ceoApprovalRating, req.body.howToPrepare, 0, 0, 0, 0, req.body.jobSeekerId, req.body.companyId];
    
    connection.query(sql, data, (err, results) => {
        if (err) {
            console.log(err);
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else{
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            res.end("Review saved successfully");
        }
    });
});

module.exports = router;
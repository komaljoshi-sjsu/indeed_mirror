const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
require('../../models/Company');

const mongoose = require("mongoose");
const Company = mongoose.model("Company");
let saveReview = async (req, callback) => {
    try {
        console.log(req.body);
        let sql = 'INSERT INTO Review(reviewTitle, reviewerRole, city, state, postedDate, rating, workHappinessScore, learningScore, appraisalScore, reviewComments, pros, cons, ceoApprovalRating, howToPrepare, noHelpfulCount, yesReviewHelpfulCount, isFeatured, adminReviewStatus, jobSeekerId, companyId ) VALUES (?,?,?,?,now(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ';
        let data = [req.body.reviewTitle, req.body.reviewerRole, req.body.city, req.body.state, req.body.rating, req.body.workHappinessScore, req.body.learningScore, req.body.appreciationScore, req.body.reviewComments, req.body.pros, req.body.cons, req.body.ceoApprovalRating, req.body.howToPrepare, 0, 0, 0,'PENDING_APPROVAL', req.body.jobSeekerId, req.body.companyId];
        
        connection.query(sql, data, (err, results) => {
            if (err) {
                callback(err, null);
            }
            else{
                let sql = 'select round(avg(Rating),1) as avgRating, round(avg(workHappinessScore),1) as avgWHScore, round(avg(learningScore),1) as avgLScore, round(avg(appraisalScore),1) as avgAppScore, round(avg(ceoApprovalRating),1) as avgCeoScore, count(Rating) as totalReviews from Review where companyId=?';
                connection.query(sql, [req.body.companyId], (err, results) => {
                    if (err) {
                        callback(err, null);
                    }
                    else if(results.length > 0){
                        console.log('update');
                        console.log(results[0].avgWHScore);
                        Company.updateOne({
                            companyId: req.body.companyId
                        }, {
                            $set: {
                                avgWorkHappinessScore: results[0].avgWHScore,
                                avgLearningScore: results[0].avgLScore,
                                avgAppreciationScore: results[0].avgAppScore,
                                noOfReviews: results[0].totalReviews,
                                companyAvgRating: results[0].avgRating,
                                ceoAvgRating: results[0].avgCeoScore
                            },
                        },{ upsert: true }, (error, data) => {
                    
                            if (error) {
                                console.log(error);
                            }else{
                                console.log('true');
                            }
                        });
                    }else{
                        console.log("no data");
                    }
                    console.log('Mongo DB success');
                    var res = {};
                    res.data= "Review saved successfully";
                    res.status = '200';
                    callback(null, res);
                });       
            }         
        });
        } catch(err) {
            
            callback('Cannot get reviews',err);
        }

};
exports.saveReview = saveReview;




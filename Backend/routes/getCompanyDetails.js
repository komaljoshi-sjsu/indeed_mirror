//loading comapny details
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
const kafka = require('../kafka/client');
router.get('/getCompanyDetails', function (req, res) {
   console.log("getCompanyDetails.....")
    let msg = {};
    msg.route = "getCompanyDetails";
    msg.body = req.body;
    //msg = req.body;
    kafka.make_request("company", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.send({...results,err:err});
        }
        else {
            res.status(200).end(results);
            
        }
    });
});

router.get('/getCompanyDetailsPaginated', function (req, res) {
    console.log("getCompanyDetailsPaginated.....")
     let msg = {};
     msg.route = "getCompanyDetailsPaginated";
     msg.query = req.query;
     //msg = req.body;
     kafka.make_request("company", msg, function (err, results) {
         if (err) {
             console.log(err);
             return res.status(400).send({...results,err:err});
         }
         else {
             res.status(200).json({companyDtls: results.companyDtls, count:results.count});
             
         }
     });
 });
// search company details using company name for admin page 
router.get('/searchAdminCompany', function (req, res) {
    console.log("searchAdminCompany.....")
     let msg = {};
     msg.route = "searchAdminCompany";
     msg.query = req.query;
     //msg = req.body;
     kafka.make_request("company", msg, function (err, results) {
         if (err) {
             console.log(err);
             return res.status(400).send({...results,err:err});
         }
         else {
             res.status(200).json({companyDtls: results.companyDtls});
             
         }
     });
 });

 router.get('/companyJobStatistics', function (req, res) {
    console.log("companyJobStatistics.....")
     let msg = {};
     msg.route = "companyJobStatistics";
     msg.query = req.query;
     //msg = req.body;
     kafka.make_request("company", msg, function (err, results) {
         if (err) {
             console.log(err);
             return res.status(400).send({...results,err:err});
         }
         else {
             console.log(results)
             res.status(200).json({hired: results.hired, rejected:results.rejected});
             
         }
     });
 });


module.exports = router;


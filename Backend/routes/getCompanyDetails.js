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
             return res.send({...results,err:err});
         }
         else {
             console.log("*******")
             console.log(results)
             console.log("*******")
             res.status(200).json({companyDtls: results.companyDtls, count:results.count});
             
         }
     });
 });
 


router.get("/searchAdminCompany", function (req, res) {
    const searchTerm = "%"+req.query.data+"%"
    const query = "SELECT * FROM Company WHERE companyName LIKE ?";
    connection.query(query, [searchTerm], (error, rows) => {
        if (error) {
            res.status(400).send("Error occured while retrieving company details");
        } else{
            return res.status(200).json({ companyDtls: rows});
          }
    });
});

router.get("/companyJobStatistics", function (req, res) {
    const companyId= Number(req.query.data)
    const hired = "Hired";
    const reject = "Rejected"
    const countQuery = "SELECT COUNT(*) as count, YEAR(appliedDate) as year FROM AppliedJobs WHERE companyId=? AND status=? GROUP BY YEAR(appliedDate)";
    connection.query(countQuery, [companyId,hired], (error, rows) => {
        if (error) {
            console.log(error)
            res.status(400).send("Error occured while retrieving company details");
        } else{
            connection.query(countQuery, [companyId,reject], function (err, rows2) {
              if (err) {
                console.log("Error occured while querying"+err);
                return res.status(400).send("Error occurred while retrieving pending reviews");
              }
              return res.status(200).json({ hired: rows, rejected:rows2});
            })
          }
    });
});

module.exports = router;


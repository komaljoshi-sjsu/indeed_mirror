"use strict";
const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");
const conn = require("./../config/mysql_connection");

router.get("/api/snapshot/:companyId", (req, res) => {
    let msg = {};
    //msg.re = req.params.customerId;
    msg.route = "snapshot";
    msg.companyId = req.params.companyId;
    kafka.make_request("company", msg, function (err, results) {
        console.log("inside kafka");
        if (err) {
            console.log("inside error");
            return res.send({...results,err:err});
        }
        else {
            return res.send(results);
        }
    });
});

router.get("/api/featuredReviews/:companyId", (req, res) => {
    let msg = {};
    //msg.re = req.params.customerId;
    msg.route = "featuredReviews";
    msg.companyId = req.params.companyId;
    kafka.make_request("company", msg, function (err, results) {
        console.log("inside kafka");
        if (err) {
            console.log("inside error");
            return res.send({...results,err:err});
        }
        else {
            return res.send(results);
        }
    });
});

module.exports = router;

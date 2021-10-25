"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
const { auth } = require("../config/passport");
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Company = require('../models/Company');
auth();

router.get("/api/snapshot/:companyId", (req, res) => {
    try {
        const cid = req.params.companyId;
        Company.find({companyId:cid}).then(result=> {
            return res.status(200).send(result);
        }).catch(err=> {
            return res.status(503).send('Failed to get company details');
        })
        
    }
    catch (error) {
        console.log("ERROR!!!!!" +error);
        return res.status(400).send("Failed to get company detail");
    }
});

router.get("/api/featuredReviews/:companyId", (req, res) => {
    try {
        const cid = req.params.companyId;
        conn.mysqlCon.query('SELECT reviewTitle, reviewerRole, city, state, postedDate, rating, reviewComments, pros, cons FROM Review WHERE companyId=? AND isFeatured=?',[cid,true],(err,reviews)=> {
            if(err) {
                console.log(err);
                return res.status(400).send('Failed to fetch featured reviews');
            } else {
                return res.status(200).send(reviews);
            }
        })
        
    }
    catch (error) {
        console.log("ERROR!!!!!" +error);
        return res.status(400).send("Failed to get featured reviews of the company");
    }
});

module.exports = router;

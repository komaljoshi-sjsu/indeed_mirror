"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
const { auth } = require("../config/passport");
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
auth();

router.post("/api/login", (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const accountType = req.body.accountType;
        if ("JobSeeker" === accountType) {
            conn.mysqlCon.query(
                "select * from JobSeeker where jobSeekerEmail = ?",
                [email],
                async function (err, results) {
                    if (err) {
                        console.log("error");
                        res.status(400).send("Error ocurred");
                    }
                    if (results.length <= 0) {
                        console.log("Not found");
                        res.status(400).send("JobSeeker not registered");
                    }
                    console.log(results[0])
                    const compRes = await bcrypt.compare(password, results[0].jobSeekerPassword);
                    const payload = { id: results[0].jobSeekerId, accountType: results[0].accountType, user: results[0] };
                    if (compRes) {
                        const token = jwt.sign(payload, secret, {
                            expiresIn: 1008000,
                        });
                        console.log("JWT " + token);
                        res.status(200).json("JWT " + token);
                    } else {
                        console.log("incorrect");
                        res.status(400).send("Password incorrect");
                    }
                }
            );
        } else if ("Employer" === accountType) {
            conn.mysqlCon.query(
                "select * from Employer where employerEmail = ?",
                [email],
                async function (err, results) {
                    if (err) {
                        res.status(400).send("Error ocurred");
                    }
                    if (results.length <= 0) {
                        res.status(400).send("Employer not registered");
                    }
                    const compRes = await bcrypt.compare(password, results[0].employerPassword);
                    const payload = { id: results[0].employerId, accountType: results[0].accountType, user: results[0] };
                    if (compRes) {
                        const token = jwt.sign(payload, secret, {
                            expiresIn: 1008000,
                        });
                        console.log("JWT " + token);
                        res.status(200).json("JWT " + token);
                    } else {
                        console.log("incorrect");
                        res.status(400).send("Password incorrect");
                    }
                }
            );
        }
    }
    catch (error) {
        console.log("ERROR!!!!!" +error);
        return res.status(400).send("Error while login");
    }
});

module.exports = router;

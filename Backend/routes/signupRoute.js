"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
const bcrypt = require("bcryptjs");

router.post("/api/signup", (req, res) => {
  try {
    const name = req.body.name
    const emailId = req.body.email;
    const pwd = req.body.password;
    const accountType = req.body.accountType;
    if ("JobSeeker" === accountType) {
      conn.mysqlCon.query(
        "Select * from JobSeeker where jobSeekerEmail = ?",
        [emailId],
        async function (err, rows) {
          if (err) {
            res.status(400).send("Unknown error occured");
          }
          if (rows.length) {
            console.log("already registered");
            res
              .status(400)
              .send("JobSeeker already registered with this emailId");
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashPwd = await bcrypt.hash(pwd, salt);

            const insertQuery =
              "insert into JobSeeker (jobSeekerName, jobSeekerEmail, jobSeekerPassword, accountType) values (?, ?, ?, ?)";
            conn.mysqlCon.query(
              insertQuery,
              [name, emailId, hashPwd, accountType],
              function (err, rows) {
                res
                  .status(200)
                  .send("JobSeeker registered successfully" + rows);
              }
            );
          }
        }
      );
    } else if ("Employer" === accountType) {
      conn.mysqlCon.query(
        "Select * from Employer where employerEmail = ?",
        [emailId],
        async function (err, rows) {
          if (err) {
            res.status(400).send("Unknown error occured");
          }
          if (rows.length) {
            console.log("already registered");
            res
              .status(400)
              .send("Employer already registered with this emailId");
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashPwd = await bcrypt.hash(pwd, salt);
            const insertQuery =
              "insert into Employer (employerName, employerEmail, employerPassword, accountType) values (?, ?, ?, ?)";
            conn.mysqlCon.query(
              insertQuery,
              [name, emailId, hashPwd, accountType],
              function (err, rows) {
                res
                  .status(200)
                  .send("Employer registered successfully" + rows);
              }
            );
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while registering");
  }
});

module.exports = router;
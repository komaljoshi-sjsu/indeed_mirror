"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
const { auth } = require("../config/passport");
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JobSeeker = require('../models/JobSeeker');
auth();

router.get("/api/updateJobSeekerProfile/:id", (req, res) => {
    try {
        const cid = req.params.id;
        Company.find({companyId:cid}).then(result=> {
            console.log(result);
            let cmpny = result[0];
            const companyQuery = 'SELECT * FROM Company WHERE companyId=?';
            conn.query(companyQuery,[cid], (error,details)=> {
                console.log(details);
                if(error) {
                    return res.status(400).send('Failed to get company details');
                }
                else {
                    details = details[0];
                    details.whScore = cmpny.avgWorkHappinessScore;
                    details.lScore = cmpny.avgLearningScore;
                    details.apScore = cmpny.avgAppreciationScore;
                    details.noOfReviews = cmpny.noOfReviews;
                    return res.status(200).send(details);
                }
            })
        }).catch(err=> {
            return res.status(503).send('Failed to get company details');
        })
        
    }
    catch (error) {
        console.log("ERROR!!!!!" +error);
        return res.status(400).send("Failed to get company detail");
    }
});

router.post("/api/setJobPreferences", (req, res) => {
    try {
        const jid = req.body.id;
        const data = req.body.data;
        let respData = {
            msg: 'success',
            code: '200'
        }
        const prefKeys = ['Job Title','Job Types','Work Schedules','Pay','Relocation','Remote'];
        let updateKey = '';
        for(let key in data) {
            updateKey = key;
            if(!prefKeys.includes(key)) {
                respData.code = '400';
                respData.msg = 'Invalid job preference "'+key+'" sent from client';
                return res.send(respData);
            }
        }
        let upJson = {};
        upJson['jobPreference.'+updateKey] = data[updateKey];
        JobSeeker.findOneAndUpdate({jobSeekerId:jid},{$set: upJson}).then(result=> {
            return res.send(respData);
        }).catch(err=> {
            respData.err = err;
            respData.code = '400';
            respData.msg = 'Failed to update job preference. Please refer console for more details';
            return res.send(respData);
        })
        
    }
    catch (error) {
        console.log("ERROR!!!!!",error);
        return res.status(400).send("Failed to update jobseeker preference");
    }
});

module.exports = router;

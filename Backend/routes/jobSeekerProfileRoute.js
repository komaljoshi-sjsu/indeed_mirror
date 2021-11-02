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

router.post("/api/updateJobSeekerProfile", (req, res) => {
    try {
        const cid = req.body.id;
        const data = req.body.data;
        let queryKeys = '';
        let queryVal = [];
        let respData = {
            msg: 'success',
            code: '200'
        }
        for(let key in data) {
            if(queryKeys.length == 0) {
                queryKeys = key+'=?';
            } else {
                queryKeys += ','+key+'=?';;
            }

            queryVal.push(data[key]);
        }
        if(queryKeys.length == 0) {
            respData.code = '203';
            respData.msg = 'No data came from the client';
            return res.send(respData);
        }
        queryVal.push(cid);
        const queryStr = 'UPDATE JobSeeker SET '+queryKeys+' WHERE id=?';
        console.log(queryStr);
        conn.query(queryStr,queryVal,(err,result)=> {
            if(err) {
                console.log(err);
                respData.code = '203';
                respData.msg = 'Failed to update profile for the job seeker.';
                respData.err = err;
                return res.send(respData);
            } else {
                return res.send(respData);
            }
        })
        
    }
    catch (error) {
        console.log("ERROR while updating job seeker",error);
        respData.code = '203';
        respData.msg = 'Failed to update profile for the job seeker.';
        respData.err = err;
        return res.send(respData);
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

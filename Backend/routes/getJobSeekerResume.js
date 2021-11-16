//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
var mysql = require("mysql");
const jobSeeker = require('../models/JobSeeker');

router.post('/getJobSeekerResume', function(req,res){
    //var res = {status: '', jobseekerData : []};
    var jobseekerData = [];
    const jobSeekerId = req.body.id;
    console.log(req.body.id)
   
    

    jobSeeker.find({ jobSeekerId: req.body.id },(error, getresume) => {

        if (error) {
           res.status = '500';
           callback(null,res)
        }
        if (getresume) {
            res.status(200).send(getresume[0].resumeUrl)
            //console.log(getresume[0].resumeUrl)
        }
          //jobseekerData.concat(getjobpreference[0].jobPreference)
           
        //    let profile1 = {
        //     JobTitle : getjobpreference[0].jobPreference['Job Title'],
        //     JobTypes : getjobpreference[0].jobPreference['Job Types'],
        //     WorkSchedules :getjobpreference[0].jobPreference['Work Schedules'],
        //     pay:getjobpreference[0].jobPreference['Pay'],
        //     relocation:getjobpreference[0].jobPreference['Relocation'],
        //     remote:getjobpreference[0].jobPreference['Remote'],
        // };
        // jobseekerData.push(profile1);
        // }
        // res.status(200).send(jobseekerData)
    })
    
});
module.exports = router;







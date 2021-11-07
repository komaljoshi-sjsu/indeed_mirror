'use strict'
const express = require('express')
const router = express.Router()
const conn = require('../config/mysql_connection')

router.get('/jobPosted', (req, res) => {
  try {
    // add [id] to get data for particular employer
    conn.query('SELECT count(Job.jobId) as countJobId ,Employer.name from Job,Employer where Employer.id=Job.id  and Job.id =1 and YEAR(Job.jobPostedDate) <=YEAR(CURDATE()) and YEAR(Job.jobPostedDate) >= YEAR(CURDATE())-1;', async function (err, results) {
      if (results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Report details not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    })
  } catch (error) {
    console.log('ERROR!' + error)
    return res.status(400).send('Error while fetching details')
  }
})


router.get('/applicantsDetail', (req, res) => {
  try {
    // add [id] for a employer
    conn.query('SELECT count(AppliedJobs.id) as countAppId,status,AppliedJobs.companyId,Company.companyName as companyName from AppliedJobs,Employer,Company where AppliedJobs.companyId=Employer.companyId and AppliedJobs.companyId=Company.companyId and Employer.id=3 group by status, AppliedJobs.companyId;', async function (err, results) {
      if (results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Report details not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    })
  } catch (error) {
    console.log('ERROR!' + error)
    return res.status(400).send('Error while fetching details')
  }
})

module.exports = router
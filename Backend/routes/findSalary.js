'use strict'
const express = require('express')
const router = express.Router()
const conn = require('./../config/mysql_connection')

router.get('/findSalaries', (req, res) => {
  try {
    conn.query('select companyId,avg(salaryDetails) as salaryDetails,jobId,jobTitle,companyName,city,state,zip,industry from Job group by jobTitle;', async function (err, results) {
      if (results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Job details not found')
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


router.get('/findSalByTitle', (req, res) => {
  try {
    conn.query('select companyId,avg(salaryDetails) as salaryDetails,jobId,jobTitle,companyName,city,state,zip,industry from Job where lower(jobTitle) like lower("S%")  group by jobTitle order by salaryDetails  DESC limit 5 ;', async function (err, results) {
      if (results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Job details not found')
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
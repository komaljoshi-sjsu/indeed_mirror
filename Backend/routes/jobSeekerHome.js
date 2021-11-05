'use strict'
const express = require('express')
const router = express.Router()
const conn = require('./../config/mysql_connection')

router.get('/jobSeeker/home', (req, res) => {
  conn.query('select * from Job;', async function (err, results) {
    if (results && results.length <= 0) {
      console.log('Not found')
      res.status(400).send('Job details not found')
    }
    if (err) {
      console.log('error')
      res.status(400).send('Error ocurred')
    }
    return res.send(results)
  })
})

router.get('/jobSeeker/getCompanyReviews', (req, res) => {
  conn.query(
    "select count(reviewId) as NoOfReviews,companyId from Review where adminReviewStatus = 'APPROVED' group by companyId",
    async function (err, results) {
      if (results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Reviews not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    },
  )
})

router.get('/jobSeeker/getCompanyRating', (req, res) => {
  conn.query(
    'select CAST(avg(rating)AS DECIMAL(10,2)) as avgRating, companyId from Review',
    async function (err, results) {
      if (results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Rating not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    },
  )
})

module.exports = router

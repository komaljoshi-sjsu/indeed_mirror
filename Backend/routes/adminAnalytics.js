'use strict'
const express = require('express')
const router = express.Router()
const conn = require('../config/mysql_connection')

router.get('/revPerDay', (req, res) => {
  try {
    conn.query('SELECT count(reviewId) as revId ,DATE_FORMAT(postedDate,"%Y-%m-%d") as postedDate from Review group by postedDate;', async function (err, results) {
      if (results.length <= 0) {
        console.log('Not found')
        res.status(400).send(' Details not found')
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

module.exports = router;
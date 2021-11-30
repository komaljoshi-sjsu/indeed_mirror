const express = require('express')
const router = express.Router()
const conn = require('./../config/mysql_connection')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const Company = mongoose.model('Company')
const kafka = require('../kafka/client')
const { checkAuth } = require('../config/passport')

router.post('/jobs/companyJobs', (req, res) => {
  // const { companyName } = req.body
  // console.log(req.body)
  // conn.query(
  //   'select * from Job where companyName = ?',
  //   [companyName],
  //   async function (err, results) {
  //     if (results && results.length <= 0) {
  //       console.log('Not found')
  //       res.status(400).send('Job details not found')
  //     }
  //     if (err) {
  //       console.log('error ' + err)
  //       res.status(400).send('Error ocurred')
  //     }
  //     return res.send(results)
  //   },
  // )
  console.log('Job company jobs.....')
  let msg = {}
  msg.route = 'companyJobs'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobs/paginatedData', (req, res) => {
  // //console.log(JSON.stringify(req.body))
  // const postsPerPage = 5
  // const currentPage = req.body.currentPage
  // const { companyName } = req.body
  // console.log(req.body)
  // conn.query(
  //   'select * from Job where companyName = ? limit ?,?',
  //   [companyName, (currentPage - 1) * postsPerPage, postsPerPage],
  //   async function (err, results) {
  //     if (results && results.length <= 0) {
  //       console.log('Not found')
  //       res.status(400).send('Job details not found')
  //     }
  //     if (err) {
  //       console.log('error ' + err)
  //       res.status(400).send('Error ocurred')
  //     }
  //     return res.send(results)
  //   },
  // )
  console.log('Job paginated data.....')
  let msg = {}
  msg.route = 'jobsPaginatedData'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobs/filterOnJobTitleOrCompanyName', (req, res) => {
  // console.log(JSON.stringify(req.body))
  // const { companyName } = req.body
  // const jobTitle = req.body.keyword
  // const postsPerPage = 5
  // const currentPage = req.body.currentPage
  // conn.query(
  //   'select * from Job where jobTitle = ? and companyName = ? limit ?,?',
  //   [jobTitle, companyName, (currentPage - 1) * postsPerPage, postsPerPage],
  //   async function (err, results) {
  //     await conn.query(
  //       'select count(*) as count from Job where jobTitle = ? and companyName = ?',
  //       [jobTitle, companyName],
  //       (err2, count) => {
  //         if (count && count.length <= 0) {
  //           console.log('Not found')
  //           res.status(400).send('Job details not found')
  //         }
  //         if (err2) {
  //           console.log('error')
  //           res.status(400).send('Error ocurred')
  //         }
  //         //console.log(JSON.stringify(count), JSON.stringify(results))
  //         return res.status(200).json({ result: results, count: count })
  //       },
  //     )
  //     if (results && results.length <= 0) {
  //       console.log('Not found')
  //       res.status(400).send('Job details not found')
  //     }
  //     if (err) {
  //       console.log('error')
  //       res.status(400).send('Error ocurred')
  //     }
  //   },
  // )
  console.log('Job filterOnJobTitleOrCompanyName data.....')
  let msg = {}
  msg.route = 'jobsFilterOnJobTitleOrCompanyName'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobs/filterOnLocation', (req, res) => {
  // console.log(JSON.stringify(req.body))
  // const city = req.body.keyword
  // const state = req.body.keyword
  // const zip = req.body.keyword
  // const { companyName } = req.body
  // const postsPerPage = 5
  // const currentPage = req.body.currentPage
  // conn.query(
  //   'select * from Job where (city = ? or state = ? or zip = ?) and companyName = ? limit ?,?',
  //   [
  //     city,
  //     state,
  //     zip,
  //     companyName,
  //     (currentPage - 1) * postsPerPage,
  //     postsPerPage,
  //   ],
  //   async function (err, results) {
  //     await conn.query(
  //       'select count(*) as count from Job where (city = ? or state = ? or zip = ?) and companyName = ? ',
  //       [city, state, zip, companyName],
  //       (err2, count) => {
  //         if (count && count.length <= 0) {
  //           console.log('Not found')
  //           return res.status(400).send('Job details not found')
  //         }
  //         if (err2) {
  //           console.log('error')
  //           res.status(400).send('Error ocurred')
  //         }
  //         //console.log(JSON.stringify(count), JSON.stringify(results))
  //         return res.status(200).json({ result: results, count: count })
  //       },
  //     )
  //     if (results && results.length <= 0) {
  //       console.log('Not found')
  //       res.status(400).send('Job details not found')
  //     }
  //     if (err) {
  //       console.log('error')
  //       res.status(400).send('Error ocurred')
  //     }
  //   },
  // )
  console.log('Job filterOnLocation data.....')
  let msg = {}
  msg.route = 'jobsFilterOnLocation'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobs/filterOnLocationAndTitle', (req, res) => {
  // console.log(JSON.stringify(req.body))
  // const city = req.body.wherekeyword
  // const state = req.body.wherekeyword
  // const zip = req.body.wherekeyword
  // const companyName = req.body.companyName
  // const jobTitle = req.body.whatkeyword
  // const postsPerPage = 5
  // const currentPage = req.body.currentPage
  // conn.query(
  //   'select * from Job where (city = ? or state = ? or zip = ?) and jobTitle = ? and companyName = ? limit ?,?',
  //   [
  //     city,
  //     state,
  //     zip,
  //     jobTitle,
  //     companyName,
  //     (currentPage - 1) * postsPerPage,
  //     postsPerPage,
  //   ],
  //   async function (err, results) {
  //     await conn.query(
  //       'select count(*) as count from Job where (city = ? or state = ? or zip = ?) and jobTitle = ? and companyName = ?',
  //       [city, state, zip, jobTitle, companyName],
  //       (err2, count) => {
  //         if (count && count.length <= 0) {
  //           console.log('Not found')
  //           return res.status(400).send('Job details not found')
  //         } else if (err2) {
  //           console.log('error')
  //           return res.status(400).send('Error ocurred')
  //         }
  //         //console.log(JSON.stringify(count), JSON.stringify(results))
  //         else return res.status(200).json({ result: results, count: count })
  //       },
  //     )
  //     if (results && results.length <= 0) {
  //       console.log('Not found')
  //       return res.status(400).send('Job details not found')
  //     }
  //     if (err) {
  //       console.log('error')
  //       return res.status(400).send('Error ocurred')
  //     }
  //   },
  // )
  console.log('Job filterOnLocationAndTitle data.....')
  let msg = {}
  msg.route = 'jobsFilterOnLocationAndTitle'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobs/applyJob', checkAuth, (req, res) => {
  // let { appliedDate, jobId, id, companyId } = req.body
  // console.log(req.body)
  // conn.query(
  //   "insert into AppliedJobs (status, appliedDate, jobId, id, companyId) values ('Applied',?,?,?,?) ",
  //   [appliedDate, jobId, id, companyId],
  //   async function (err, results) {
  //     if (results && results.length <= 0) {
  //       console.log('Not found')
  //       res.status(400).send('Cannot insert job to applied table')
  //     }
  //     if (err) {
  //       console.log('error' + err)
  //       res.status(400).send('Error ocurred')
  //     }
  //     return res.send(results)
  //   },
  // )
  console.log('Job applyJob data.....')
  let msg = {}
  msg.route = 'jobsApplyJob'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobs/getCompanyImage', (req, res) => {
  // let { companyId } = req.body
  // console.log(req.body)
  // try {
  //   Company.findOne({ companyId: companyId })
  //     .then((result) => {
  //       console.log('sending Image response ............')
  //       console.log(result)
  //       return res.status(200).send(result)
  //     })
  //     .catch((err) => {
  //       console.log('Error occured while querying' + err)
  //       return res
  //         .status(400)
  //         .send('Error occurred while retrieving company image')
  //     })
  // } catch {
  //   ;(err) => {
  //     return res.status(400).json({ error: err })
  //   }
  // }
  console.log('Job getCompanyImage data.....')
  let msg = {}
  msg.route = 'getCompanyImage'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

module.exports = router

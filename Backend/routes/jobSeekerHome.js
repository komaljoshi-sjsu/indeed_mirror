'use strict'
const express = require('express')
const router = express.Router()
const conn = require('./../config/mysql_connection')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const Company = mongoose.model('Company')
const JobSeeker = mongoose.model('JobSeeker')
const kafka = require('../kafka/client')
const { checkAuth } = require('../config/passport')

router.get('/jobSeeker/home', (req, res) => {
  // conn.query('select * from Job;', async function (err, results) {
  //   if (results && results.length <= 0) {
  //     console.log('Not found')
  //     res.status(400).send('Job details not found')
  //   }
  //   if (err) {
  //     console.log('error')
  //     res.status(400).send('Error ocurred')
  //   }
  //   return res.send(results)
  // })
  console.log('Job Seeker home.....')
  let msg = {}
  msg.route = 'home'
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

router.post('/jobSeeker/paginatedData', (req, res) => {
  //console.log(JSON.stringify(req.body))
  // const postsPerPage = 5
  // const currentPage = req.body.currentPage
  // conn.query(
  //   'select * from Job limit ?,?',
  //   [(currentPage - 1) * postsPerPage, postsPerPage],
  //   async function (err, results) {
  //     if (results && results.length <= 0) {
  //       console.log('Not found')
  //       res.status(400).send('Job details not found')
  //     }
  //     if (err) {
  //       console.log('error')
  //       res.status(400).send('Error ocurred')
  //     }
  //     return res.send(results)
  //   },
  // )
  console.log('Job Seeker getting paginated data.....')
  let msg = {}
  msg.route = 'paginatedData'
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

router.post('/jobSeeker/filterOnJobTitleOrCompanyName', (req, res) => {
  // console.log(JSON.stringify(req.body))
  // const companyName = req.body.keyword
  // const jobTitle = req.body.keyword
  // const postsPerPage = 5
  // const currentPage = req.body.currentPage
  // conn.query(
  //   'select * from Job where jobTitle = ? or companyName = ? limit ?,?',
  //   [jobTitle, companyName, (currentPage - 1) * postsPerPage, postsPerPage],
  //   async function (err, results) {
  //     await conn.query(
  //       'select count(*) as count from Job where jobTitle = ? or companyName = ?',
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

  console.log('Job Seeker filter On JobTitle Or CompanyName.....')
  let msg = {}
  msg.route = 'filterOnJobTitleOrCompanyName'
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

router.post('/jobSeeker/filterOnLocation', (req, res) => {
  // console.log(JSON.stringify(req.body))
  // const city = req.body.keyword
  // const state = req.body.keyword
  // const zip = req.body.keyword
  // const postsPerPage = 5
  // const currentPage = req.body.currentPage
  // conn.query(
  //   'select * from Job where city = ? or state = ? or zip = ? limit ?,?',
  //   [city, state, zip, (currentPage - 1) * postsPerPage, postsPerPage],
  //   async function (err, results) {
  //     await conn.query(
  //       'select count(*) as count from Job where city = ? or state = ? or zip = ?',
  //       [city, state, zip],
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
  console.log('Job Seeker filter On location.....')
  let msg = {}
  msg.route = 'filterOnLocation'
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

router.post('/jobSeeker/filterOnLocationAndTitle', (req, res) => {
  // console.log(JSON.stringify(req.body))
  // const city = req.body.wherekeyword
  // const state = req.body.wherekeyword
  // const zip = req.body.wherekeyword
  // const companyName = req.body.whatkeyword
  // const jobTitle = req.body.whatkeyword
  // const postsPerPage = 5
  // const currentPage = req.body.currentPage
  // conn.query(
  //   'select * from Job where (city = ? or state = ? or zip = ?) and (jobTitle = ? or companyName = ?) limit ?,?',
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
  //       'select count(*) as count from Job where (city = ? or state = ? or zip = ?) and (jobTitle = ? or companyName = ?)',
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
  console.log('Job Seeker filter On location and title.....')
  let msg = {}
  msg.route = 'filterOnLocationAndTitle'
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

router.get('/jobSeeker/getCompanyReviews', (req, res) => {
  // conn.query(
  //   "select count(reviewId) as NoOfReviews,companyId from Review where adminReviewStatus = 'APPROVED' group by companyId",
  //   async function (err, results) {
  //     if (results.length <= 0) {
  //       console.log('Not found')
  //       res.status(400).send('Reviews not found')
  //     }
  //     if (err) {
  //       console.log('error')
  //       res.status(400).send('Error ocurred')
  //     }
  //     return res.send(results)
  //   },
  // )
  console.log('Job Seeker get company reviews.....')
  let msg = {}
  msg.route = 'getCompanyReviews'
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

router.get('/jobSeeker/getCompanyRating', (req, res) => {
  // conn.query(
  //   'select CAST(avg(rating)AS DECIMAL(10,2)) as avgRating, companyId from Review',
  //   async function (err, results) {
  //     if (results.length <= 0) {
  //       console.log('Not found')
  //       res.status(400).send('Rating not found')
  //     }
  //     if (err) {
  //       console.log('error')
  //       res.status(400).send('Error ocurred')
  //     }
  //     return res.send(results)
  //   },
  // )
  console.log('Job Seeker get company rating.....')
  let msg = {}
  msg.route = 'getCompanyRating'
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

router.post('/jobSeeker/updateNoOfViews', (req, res) => {
  // const { id } = req.body
  // console.log(JSON.stringify(req.body))
  // try {
  //   console.log('exec')
  //   Company.updateOne({ companyId: id }, { $inc: { noOfViews: 1 } })
  //     .then((result) => {
  //       console.log(result)
  //       return res.status(200).send(result)
  //     })
  //     .catch((err) => {
  //       console.log('Error occured while querying' + err)
  //       return res
  //         .status(400)
  //         .send('Error occurred while retrieving no of views')
  //     })
  // } catch {
  //   ;(err) => {
  //     return res.status(400).json({ error: err })
  //   }
  // }
  console.log('Job Seeker updating no of views.....')
  let msg = {}
  msg.route = 'updateNoOfViews'
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

router.post('/jobSeeker/saveJob', checkAuth, (req, res) => {
  // let {
  //   companyId,
  //   city,
  //   state,
  //   zip,
  //   jobType,
  //   salary,
  //   location,
  //   jobId,
  //   userId,
  //   roleName,
  //   companyName,
  // } = req.body
  // companyId = parseInt(companyId)
  // console.log(JSON.stringify(req.body))
  // const data = {
  //   companyId: companyId,
  //   jobId: jobId,
  //   city: city,
  //   state: state,
  //   zip: zip,
  //   jobType: jobType,
  //   salary: salary,
  //   location: location,
  //   roleName: roleName,
  //   companyName: companyName,
  // }
  // try {
  //   console.log('exec')
  //   JobSeeker.update({ jobSeekerId: userId }, { $push: { savedJobs: data } })
  //     .then((result) => {
  //       console.log(result)
  //       return res.status(200).send(result)
  //     })
  //     .catch((err) => {
  //       console.log('Error occured while querying' + err)
  //       return res
  //         .status(400)
  //         .send('Error occurred while retrieving no of views')
  //     })
  // } catch {
  //   ;(err) => {
  //     return res.status(400).json({ error: err })
  //   }
  // }

  console.log('Job Seeker saving to jobs array.....')
  let msg = {}
  msg.route = 'saveJob'
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

router.post('/jobSeeker/checkSavedStatus', checkAuth, (req, res) => {
  // let { companyId, jobId, userId } = req.body
  // companyId = parseInt(companyId)
  // console.log(JSON.stringify(req.body))
  // const data = { companyId: companyId, jobId: jobId }
  // try {
  //   console.log('exec')
  //   JobSeeker.findOne(
  //     { jobSeekerId: userId },
  //     { savedJobs: { $elemMatch: data } },
  //   )
  //     .then((result) => {
  //       console.log(result)
  //       console.log(result.savedJobs.length)
  //       if (result.savedJobs.length > 0) return res.status(200).send(result)
  //       else return res.status(201).send(result)
  //     })
  //     .catch((err) => {
  //       console.log('Error occured while querying find saved jobs' + err)
  //       return res
  //         .status(400)
  //         .send('Error occurred while retrieving saved jobs')
  //     })
  // } catch {
  //   ;(err) => {
  //     return res.status(400).json({ error: err })
  //   }
  // }

  console.log('Job Seeker checking saved status.....')
  let msg = {}
  msg.route = 'checkSavedStatus'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      console.log(results)
      return res.status(results.status).send(results)
    }
  })
})

router.post('/jobSeeker/applyJob', checkAuth, (req, res) => {
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
  console.log('Job Seeker Applying to a job.....')
  let msg = {}
  msg.route = 'applyJob'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      return res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/checkAppliedStatus', checkAuth, (req, res) => {
  // let { appliedDate, jobId, id, companyId } = req.body
  // console.log(req.body)
  // conn.query(
  //   'select * from AppliedJobs where jobId = ? and id = ? and companyId = ?',
  //   [jobId, id, companyId],
  //   async function (err, results) {
  //     if (results && results.length <= 0) {
  //       console.log('Not found')
  //       res.status(201).send('Cannot find in applied table')
  //     } else {
  //       return res.send(results)
  //     }
  //     if (err) {
  //       console.log('error' + err)
  //       return res.status(400).send('Error ocurred')
  //     }
  //   },
  // )
  console.log('Job Seeker checking applies status.....')
  let msg = {}
  msg.route = 'checkAppliedStatus'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      console.log(results)
      return res.status(results.status).send(results)
    }
  })
})

module.exports = router

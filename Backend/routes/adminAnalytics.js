'use strict'
const express = require('express')
const router = express.Router()
const conn = require('../config/mysql_connection')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')
const kafka = require('../kafka/client');

// The number of reviews per day.
// router.get('/revPerDay', (req, res) => {
//   try {
//     conn.query('SELECT count(reviewId) as revId ,DATE_FORMAT(postedDate,"%Y-%m-%d") as postedDate from Review group by postedDate order by postedDate LIMIT 7;', async function (err, results) {
//       if (results.length <= 0) {
//         console.log('Not found')
//         res.status(400).send(' Details not found')
//       }
//       if (err) {
//         console.log('error')
//         res.status(400).send('Error ocurred')
//       }
//       return res.send(results)
//     })
//   } catch (error) {
//     console.log('ERROR!' + error)
//     return res.status(400).send('Error while fetching details')
//   }
// })

router.get('/revPerDay', (req, res) => {
    console.log("Admin Analytics Chart One.....")
   let chrt = {};
   chrt.route = "getChartOne";
   chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
          //  console.log(results)
           res.status(200).json(results)
           
       }
   });
});

// Top 5 most reviewed companies.
// router.get('/mostRevComp', (req, res) => {
//     try {
//       // Company.aggregate({companyId})
//       Company.find()
//         .sort({noOfReviews: -1})
//         .limit(5)
//         .then((result) => {
//           // console.log(result)
//           return res.status(200).json(result)
//         })
//         .catch((err) => {
//           // console.log(err);
//           console.log('Error occured while querying')
//           return res
//             .status(400)
//             .send('Error occurred while fetching review count')
//         })
//     } catch {
//       ;(err) => {
//         return res.status(400).json({ error: err })
//       }
//     }
//   })

router.get('/mostRevComp', (req, res) => {
    console.log("Admin Analytics Chart Two.....")
   let chrt = {};
   chrt.route = "getChartTwo";
   chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
          //  console.log(results)
           res.status(200).json(results)
           
       }
   });
});


//  Top 5 companies based on average rating.
// router.get('/topAvgRatingComp', (req, res) => {
//   try {
//     // Company.aggregate({companyId})
//     Company.find()
//       .sort({companyAvgRating: -1})
//       .limit(5)
//       .then((result) => {
//         // console.log(result)
//         return res.status(200).json(result)
//       })
//       .catch((err) => {
//         // console.log(err);
//         console.log('Error occured while querying')
//         return res
//           .status(400)
//           .send('Error occurred while fetching review count')
//       })
//   } catch {
//     ;(err) => {
//       return res.status(400).json({ error: err })
//     }
//   }
// })


router.get('/topAvgRatingComp', (req, res) => {
    console.log("Admin Analytics Chart Three.....")
   let chrt = {};
   chrt.route = "getChartThree";
   chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
          //  console.log(results)
           res.status(200).json(results)
           
       }
   });
});


// Top 5 job seekers based on total accepted reviews made.
// router.get('/acceptedRev', (req, res) => {
//   try {
//     conn.query('SELECT  count(reviewId) as revId, JobSeeker.name as name from Review,JobSeeker where Review.jobSeekerId = JobSeeker.id and adminReviewStatus= "APPROVED"  group by jobSeekerId order by revId LIMIT 5;', async function (err, results) {
//       if (results.length <= 0) {
//         console.log('Not found')
//         res.status(400).send(' Details not found')
//       }
//       if (err) {
//         console.log('error')
//         res.status(400).send('Error ocurred')
//       }
//       return res.send(results)
//     })
//   } catch (error) {
//     console.log('ERROR!' + error)
//     return res.status(400).send('Error while fetching details')
//   }
// })


router.get('/acceptedRev', (req, res) => {
    console.log("Admin Analytics Chart Four.....")
   let chrt = {};
   chrt.route = "getChartFour";
   chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
          //  console.log(results)
           res.status(200).json(results)
           
       }
   });
});


// Top 10 CEO based on rating
// router.get('/ceoRating', (req, res) => {
//   let data=[];
//   let cmpny=[];
//   let finalResults=[];
//   try {
//     // Company.aggregate({companyId})
//     Company.find()
//       .sort({ceoAvgRating: -1})
//       .limit(10)
//       .then( (result) => {
//         result.forEach((dataObj) => {
//           // console.log(dataObj.ceoAvgRating);
//         data.push({"rating":dataObj.ceoAvgRating,"companyId":dataObj.companyId});
//         cmpny.push(dataObj.companyId)
//         //  console.log("data",data);
         
//       })
//       // console.log(cmpny)
//       conn.query('SELECT  ceo,companyId from Company where companyId in (?)',[cmpny], async (err, results) =>{
//         // console.log("check",results);
//             if(err) {
//               return res.status(400).send('Failed to get details');
//           }
//           // console.log("Check2",results)
//           finalResults = results.map((item, i) => Object.assign({}, item, data[i]));
//           return res.status(200).send(finalResults);
//         })
//     })
//   } catch {(err) => {
//       return res.status(400).json({ error: err })
//     }
//   }
// })

router.get('/ceoRating', (req, res) => {
    console.log("Admin Analytics Chart Five.....")
   let chrt = {};
   chrt.route = "getChartFive";
   chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
          //  console.log(results)
           res.status(200).json(results)
           
       }
   });
});



// Top 10 companies based on views per day.
//   router.get('/countPerDay', (req, res) => {
//     try {
//       conn.query('select  viewCount,Company.companyName as companyName,viewDate from CompanyView, Company where Company.companyId=CompanyView.companyId group by viewDate,companyName order by viewCount limit 10;', async function (err, results) {
//         if (err) {
//           console.log('error')
//           res.status(400).send('Error ocurred')
//         }
//         return res.send(results)
//       })
//     } catch (error) {
//       console.log('ERROR!' + error)
//       return res.status(400).send('Error while fetching details')
//     }
//   })

router.get('/countPerDay', (req, res) => {
    console.log("Admin Analytics Chart Six.....")
   let chrt = {};
   chrt.route = "getChartSix";
   chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
          //  console.log(results)
           res.status(200).json(results)
           
       }
   });
});

module.exports = router;
'use strict'
const e = require('express')
const express = require('express')
const router = express.Router()
const conn = require('./../config/mysql_connection')
const kafka = require('../kafka/client');


// router.get('/findSalaries', (req, res) => {
//   try {
//     conn.query('select companyId,avg(salaryDetails) as salaryDetails,jobId,jobTitle,companyName,city,state,zip,industry from Job group by jobTitle;', async function (err, results) {
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

router.get('/findSalaries', (req, res) => {
    console.log("Details of find salary page.....")
   let chrt = {};
   chrt.route = "findSalDisplay";
   chrt.query = req.query;
    kafka.make_request("jobseeker", chrt, function (err, results) {
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

// router.get('/findSalByTitle/:jobTitles', (req, res) => {
//   var count = 0;
//   let data1=[];
// let cmpnyId=[];
// var subquery1Result = [], subquery2Result;
// // const query ="select logo,Job.companyId,avg(salaryDetails) as salaryDetails,Job.jobId,Job.jobTitle,Job.companyName,Job.city,Job.state,Job.zip,Job.industry from Job,Company where Job.companyId=Company.companyId lower(jobTitle) like lower(?) group by jobTitle,companyId  order by salaryDetails  DESC limit 5 ;";
// const query ="select logo,Job.companyId,avg(salaryDetails) as salaryDetails,Job.jobId,Job.jobTitle,Job.companyName,Job.city,Job.state,Job.zip,Job.industry from Job,Company where Job.companyId=Company.companyId and lower(jobTitle) like lower(?) group by jobTitle,companyId  order by salaryDetails  DESC limit 5 ;";
// const subquery1 ='select round(avg(Review.rating),2) as rating,count(Review.reviewId) as revCnt, companyId from Review where Review.companyId =?;';
// const subquery2='select count(SalaryReview.companyId) as salRevCnt, companyId from SalaryReview where SalaryReview.companyId =? ;'; 
// try {
//   const jobTitle = req.params.jobTitles;
//   console.log(jobTitle);
//   conn.query(query,[jobTitle],function (err, results) {
//     if (err) {
//       console.log('error')
//        res.status(400).send('Error ocurred')
//     }
//     else {
//       // console.log(results);
//        results.forEach(dataObj => {
//         // conn.query(subquery1,[dataObj.companyId],  async function(err, rows1) {
//           cmpnyId.push(dataObj.companyId);
//           conn.query(subquery1,[dataObj.companyId], function(err, results1) {
//             if (err) {
//               console.log('error')
//               // res.status(400).send('Error ocurred')
//             }
//             else {  
//             // console.log(results1);
//             if(results1[0].companyId !== null) {
//             subquery1Result.push(results1[0]);
//             }
//             else {
//               subquery1Result.push({ salRevCnt: 0, rating: 0, companyId: dataObj.companyId })
//             }
//             // console.log("subquery1Result: ",subquery1Result);
//             conn.query(subquery2,[dataObj.companyId], function (err, results2) {
//               if (err) {
//                 console.log('error')
//               //  res.status(400).send('Error ocurred')
//               }
//               else {
//               // console.log(results2);
//               subquery2Result = {salRevCnt: results2[0].salRevCnt, companyId: dataObj.companyId };
//               // console.log("subquery2Result:",subquery2Result);
//               var filteredSubq1Res = subquery1Result.filter(obj => {
//                 return obj.companyId === subquery2Result.companyId;
//               });
//               // console.log("filteredSubq1Res:",filteredSubq1Res);
//               data1.push({"logo":dataObj.logo,"companyId":dataObj.companyId,"salaryDetails":dataObj.salaryDetails,"jobId":dataObj.jobId,"jobTitle":dataObj.jobTitle,"companyName":dataObj.companyName,"city":dataObj.city,"state":dataObj.state,"zip":dataObj.zip,"industry":dataObj.industry,"rating":filteredSubq1Res[0].rating,"revCnt":filteredSubq1Res[0].revCnt, "salRevCnt":subquery2Result.salRevCnt});
//               // console.log(data1);
//               count++;
//               if(count === results.length) {
//                 // console.log(data1);
//                 res.status(200).send(data1);
//                 }
//               }               
//             });
//             }
//           });
//         });
//     }
//   })
// } catch (error) {
//   console.log('ERROR!' + error)
//   return res.status(400).send('Error while fetching details')
// }
// })

router.get('/findSalByTitle/:jobTitles', (req, res) => {
    console.log("Find salary by title.....")
   let chrt = {"jobTitles": req.params.jobTitles};
   chrt.route = "findSalByTitleDisplay";
   chrt.query = req.query;
    kafka.make_request("jobseeker", chrt, function (err, results) {
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


module.exports = router
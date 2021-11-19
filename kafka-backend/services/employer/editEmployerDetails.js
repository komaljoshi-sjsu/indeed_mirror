"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
let editEmployerDetails = async (req, callback) => {
    try {
       
        const employerId = req.body['id'];
        const employerName = req.body['name'];
        const roleInCompany = req.body['roleInCompany'];
        const address = req.body['address'];
        const city = req.body['city'];
        const state = req.body['state'];
        const country = req.body['country'];
        const zipcode = req.body['zipcode'];
       
        let sql1 = "UPDATE Employer SET name = " +mysql.escape(employerName)
        +" ,roleInCompany =  "+mysql.escape(roleInCompany)
        +",address = "+mysql.escape(address)
        +",state = "+mysql.escape(state)
        +",country = "+mysql.escape(country)+
        ",city = "+mysql.escape(city)+
        ",zipcode = "+mysql.escape(zipcode)+
        " WHERE id = "+mysql.escape(employerId);
        //console.log(sql1);
        let query = conn.query(sql1, (error, result) => {
            if (error) {
                callback(null,error)
                //console.log(error.message);
                // res.end("Server Error. Please Try Again! ");
            } else {
                callback(null,"Success");
                // console.log(result)
                // res.status(200).end("Employer Details Edited!");
            }            
        });
        // let sql1 = "UPDATE Employer SET name = " +mysql.escape(employerName)
        // +" ,roleInCompany =  "+mysql.escape(roleInCompany)
        // +",address = "+mysql.escape(address)
        // +",state = "+mysql.escape(state)
        // +",country = "+mysql.escape(country)+
        // ",city = "+mysql.escape(city)+
        // ",zipcode = "+mysql.escape(zipcode)+
        // " WHERE id = "+mysql.escape(employerId);
        // //console.log(sql1);
        // let query = conn.query(sql1, (error, result) => {
        //     if (error) {
        //         callback(null,error)
              
        //     } else {
        //         callback(null,"Success");
        //     }            
        //  });
    
    } catch(err) {
        console.log('Cannot get user reviews',err)
        callback('Cannot get user reviews',err);
    }

};
exports.editEmployerDetails = editEmployerDetails;

  
// router.post("/editEmployerDetails", (req, res) => {
//     console.log(req.body)
//         const employerId = req.body['id'];
//         const employerName = req.body['name'];
//         const roleInCompany = req.body['roleInCompany'];
//         const address = req.body['address'];
//         const city = req.body['city'];
//         const state = req.body['state'];
//         const country = req.body['country'];
//         const zipcode = req.body['zipcode'];
//         // console.log(address);
        
//         let sql1 = "UPDATE Employer SET name = " +mysql.escape(employerName)
//         +" ,roleInCompany =  "+mysql.escape(roleInCompany)
//         +",address = "+mysql.escape(address)
//         +",state = "+mysql.escape(state)
//         +",country = "+mysql.escape(country)+
//         ",city = "+mysql.escape(city)+
//         ",zipcode = "+mysql.escape(zipcode)+
//         " WHERE id = "+mysql.escape(employerId);
//         //console.log(sql1);
//         let query = connection.query(sql1, (error, result) => {
//             if (error) {
//                 res.writeHead(500,{
//                     'Content-Type' : 'application/json'
//                 });
//                 //console.log(error.message);
//                 res.end("Server Error. Please Try Again! ");
//             } else {
//                 res.writeHead(200,{
//                     'Content-Type' : 'application/json'
//                 });
//                 console.log(result)
//                 res.status(200).end("Employer Details Edited!");
//             }            
//         });
//     });
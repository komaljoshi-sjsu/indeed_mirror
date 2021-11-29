// get employer profile

const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");
router.post('/getEmployerProfile',checkAuth, function (req, res) {
   console.log("getEmployerProfile.....")
    let msg = {};
    msg.route = "getEmployerProfile";
    msg.body = req.body;
    //msg = req.body;
    kafka.make_request("employer", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.send({...results,err:err});
        }
        else {
            res.status(200).end(results);
            
        }
    });
});

module.exports = router;
// const express = require("express");
// const router = express.Router();
// const connection = require("../config/mysql_connection");
// var mysql = require("mysql");
// router.post('/getEmployerProfile', function(req,res){
//     const employerid = req.body.empid;   
//     console.log("****")
//     console.log(employerid)
// 	let sql1 = "SELECT * FROM Employer e JOIN Company c ON e.companyId=c.companyId WHERE id = "+mysql.escape(employerid) ;
//     let query = connection.query(sql1, (error, result) => {

//     if (error) {
        
//         res.status(400).send("Server Error. Please Try Again! ");
//         }
   
//         else{
        
//             res.status(200).send(JSON.stringify(result));	
//         }
		
		
// 	});
   
    
// });
// module.exports = router;







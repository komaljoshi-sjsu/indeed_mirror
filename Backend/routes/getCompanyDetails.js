//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
var mysql = require("mysql");
router.get('/getCompanyDetails', function(req,res){ 
   
	let sql1 = "SELECT * FROM Company";
    let query = connection.query(sql1, (error, result) => {

    if (error) {
        
        res.status(400).send("Server Error. Please Try Again! ");
        }
    //  if(result.length == 0){
        
    //     res.send({ message: "No Profile Exists" })
    //      }   
        else{
            //console.log(JSON.stringify(result));
        res.status(200).send(JSON.stringify(result));	
        }
		//console.log(JSON.stringify(result));	
		
	});
   
    
});
module.exports = router;







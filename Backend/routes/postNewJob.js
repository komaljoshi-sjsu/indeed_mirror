//employeer api to post a new job
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
router.post("/postNewJob", (req, res) => {
	let postJob_sql = 'INSERT INTO Job(companyId, jobTitle, streetAddress, city, state, country, zip, salaryDetails, shortJobDescription, jobType, jobMode, companyName,industry, jobPostedDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())';
    let jobDetails = [req.body.companyId, req.body.jobTitle, req.body.streetAddress, req.body.city, req.body.state, req.body.country, req.body.zipcode, req.body.salaryDetails, req.body.shortJobDescription, req.body.jobType, req.body.jobMode, req.body.companyName,req.body.industry];

	connection.query(postJob_sql, jobDetails, (error, result) => {
				if (error) {
					res.writeHead(500,{
						'Content-Type' : 'application/json'
					});
					//console.log(error.message);
					res.end("Server Error. Please Try Again! ");
				} else {
					res.writeHead(200,{
						'Content-Type' : 'application/json'
					});
					res.end("Job posted successfully!");
				}
	});
	
	
	
});
module.exports = router;
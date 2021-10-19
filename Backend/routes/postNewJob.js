//employeer api to post a new job
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
router.post("/", (req, res) => {
	let jobDetails = {
		companyId = req.body.companyId,
		jobTitle = req.body.jobTitle,
	    streetAddress = req.body.streetAddress,
		city  = req.body.city,
		state = req.body.state,
		country = req.body.country,
		zipcode=req.body.zipcode,
		salaryDetails = req.body.salaryDetails,
		shortJobDescription=req.body.shortJobDescription,
		jobType=req.body.jobType,
		jobMode=req.body.jobMode,
		jobPostedDate=req.body.jobPostedDate
	}
	let postJob_sql = "INSERT INTO jobDetails SET ?";
			connection.query(postJob_sql, jobDetails, (error, result) => {
				if (error) {
					console.log("Error");
				} else {
					//console.log("New Job Added Successfully");
					res.send("New Job Added Successfully");
				}
			});
	
	
	
});
module.exports = router;
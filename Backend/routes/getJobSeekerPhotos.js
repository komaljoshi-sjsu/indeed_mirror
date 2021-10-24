const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Photo = mongoose.model('Photo')
//const { checkAuth } = require("../config/passport");

router.get("/api/getJobSeekerPhotos/", async (req, res) => {
    const jobSeekerId = req.query.jobSeekerId;
    const photoAdminReviewedStatus = req.query.photoAdminReviewedStatus;
    try {
      Photo.find({jobSeekerId:jobSeekerId, photoAdminReviewedStatus:photoAdminReviewedStatus})
      .then(result =>{
        console.log(result)
        return res.status(200).json({ photos: result });;
      })
      .catch(err =>{
        console.log("Error occured while querying");
        return res.status(400).send("Error occurred while retrieving photo details of jobSeeker");
      })
    }
    catch{(err) => {
      return res.status(400).json({ error: err });
    }}
});

module.exports = router;
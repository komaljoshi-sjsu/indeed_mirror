const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Photo = mongoose.model('Photo')
//const { checkAuth } = require("../config/passport");

router.get("/api/getAllPhotos/", async (req, res) => {
    const photoAdminReviewedStatus = req.query.photoAdminReviewedStatus;
    try {
      Photo.find({photoAdminReviewedStatus:photoAdminReviewedStatus})
      .then(result =>{
        console.log(result)
        return res.status(200).json({ photos: result });;
      })
      .catch(err => {
        console.log("Error occured while querying");
        return res.status(400).send("Error occurred while retrieving all photos");
      })
    }
    catch{(err) => {
      return res.status(400).json({ error: err });
    }}
});

module.exports = router;
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Photo = mongoose.model('Photo')
//const { checkAuth } = require("../config/passport");

router.post("/api/setPhotoStatus", async (req, res) => {
    console.log(req.body)
    const { _id, photoAdminReviewedStatus } = req.body;
    try {
      Photo.findByIdAndUpdate(_id,
        {"$set":{
            photoAdminReviewedStatus:photoAdminReviewedStatus}})
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
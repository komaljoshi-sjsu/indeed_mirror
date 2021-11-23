const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Conversation = mongoose.model('Conversation')
const conn = require("./../config/mysql_connection");

router.post("/api/saveConversation", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).send("Error occurred while saving conversation");
    }
});

router.get("/api/getConversationById/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [Number(req.params.userId)] },
      });
      console.log(conversation);
      res.status(200).json(conversation);
    } catch (err) {
        res.status(500).send("Error occurred while retrieving conversations");
    }
});

router.get("/api/getJobSeekerById/:jobSeekerId", async (req, res) => {
  const query = "select id, name from JobSeeker where id = ?";
  conn.query(query, [req.params.jobSeekerId], async function (err, rows) {
    if (err) {
      console.log("Error occurred while retreiving job seekers");
      res
        .status(400)
        .send("Error occurred while retreiving job seekers");
    }
    console.log("Query executed: ", rows);
    res.status(200).send(rows[0]);
  });
});

router.get("/api/getEmployerById/:employerId", async (req, res) => {
  const query = "select id, name from Employer where id = ?";
  conn.query(query, [req.params.employerId], async function (err, rows) {
    if (err) {
      console.log("Error occurred while retreiving employers");
      res
        .status(400)
        .send("Error occurred while retreiving employers");
    }
    console.log("Query executed: ", rows);
    res.status(200).send(rows[0]);
  });
});

module.exports = router;
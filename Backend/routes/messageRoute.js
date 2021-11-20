const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Message = mongoose.model('Message')
const conn = require("./../config/mysql_connection");

router.post("/api/addNewMessage", async (req, res) => {

    const newMessage = new Message(req.body);
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).send("Error occurred while adding new message");
    }
});

router.get("/api/getConversation/:conversationId", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
        res.status(500).send("Error occurred while retrieving message by conversation id");
    }
});


router.get("/api/getAllJobSeekers", async (req, res) => {
    const query = "select id, name, email from JobSeeker";
    conn.query(query, async function (err, rows) {
      if (err) {
        console.log("Error occurred while retreiving job seekers");
        res
          .status(400)
          .send("Error occurred while retreiving job seekers");
      }
      console.log("Query executed: ", rows[0]);
      res.status(200).send(rows[0]);
    });
});

//get all the jobseekers who have applied for jobs for a particular company
// router.get("/api/getAppliedJobSeekers/:companyId", async (req, res) => {
//     const companyId = req.params.companyId;
//     const query = "select j.name, j.email, a.id from AppliedJobs a, JobSeeker j where a.id = j.id and a.companyId = ?";
//     conn.query(query, companyId, async function (err, rows) {
//       if (err) {
//         console.log("Error occured while retreiving applied job seekers");
//         res
//           .status(400)
//           .send("Error occured while retreiving applied job seekers");
//       }
//       console.log("Query executed: ", rows[0]);
//       res.status(200).send(rows[0]);
//     });
// });

module.exports = router;
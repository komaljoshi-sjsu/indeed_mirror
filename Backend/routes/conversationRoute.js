const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client")

router.post("/api/saveConversation", async (req, res) => {
  let msg = {};
  msg.route = "saveConversation";
  msg.body = req.body;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log(results);
      return res.status(results.status).json(results.savedConversation);
    }
  });
});

router.get("/api/getConversationById/:userId", async (req, res) => {
  let msg = {};
  msg.route = "getConversationById";
  msg.params = req.params.userId;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log(results);
      return res.status(results.status).json(results.conversation);
    }
  });
});

router.get("/api/getJobSeekerById/:jobSeekerId", async (req, res) => {
  let msg = {};
  msg.route = "getJobSeekerById";
  msg.params = req.params.jobSeekerId;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log("printing jobseekers" + results);
      return res.status(results.status).send(results.details);
    }
  });
});

router.get("/api/getEmployerById/:employerId", async (req, res) => {
  let msg = {};
  msg.route = "getEmployerById";
  msg.params = req.params.employerId;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log(results);
      return res.status(results.status).send(results.details);
    }
  });
});
  // const query = "select id, name from Employer where id = ?";
  // conn.query(query, [req.params.employerId], async function (err, rows) {
  //   if (err) {
  //     console.log("Error occurred while retreiving employers");
  //     res.status(400).send("Error occurred while retreiving employers");
  //   }
  //   console.log("Query executed: ", rows);
  //   res.status(200).send(rows[0]);
  // });


module.exports = router;

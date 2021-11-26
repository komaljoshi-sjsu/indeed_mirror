//const { checkAuth } = require("../config/passport");
const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client")

router.post("/api/addNewMessage", async (req, res) => {
  let msg = {};
  msg.route = "addNewMessage";
  msg.body = req.body;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log(results);
      return res.status(results.status).json(results.savedMessage);
    }
  });
});

router.get("/api/getMessages/:conversationId", async (req, res) => {
  let msg = {};
  msg.route = "getMessagesByConversationId";
  msg.params = req.params.conversationId;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log(results);
      return res.status(results.status).json(results.messages);
    }
  });
});


router.get("/api/getAllJobSeekers", async (req, res) => {
  let msg = {};
  msg.route = "getAllJobSeekers";
  console.log("inside getAllJobSeekers");
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      console.log("printing get all job sekers" + results.details);
      return res.status(results.status).send(results.details);
    }
  });
});

module.exports = router;

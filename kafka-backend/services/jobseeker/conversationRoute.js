const mongoose = require("mongoose");
require('../../models/Conversation');
const Conversation = mongoose.model("Conversation");
const conn = require("../../config/mysql_connection");

const saveConversation = async (req, callback) => {
  let response = {};
  let error = {};
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    response.status = 200;
    response.savedConversation = savedConversation;
    return callback(null, response);
    //res.status(200).json(savedConversation);
  } catch (err) {
    error.status = 500;
    error.message = "Error occurred while saving conversation";
    error.data = err;
    return callback(error, null);
    //res.status(500).send("Error occurred while saving conversation");
  }
};
// router.post("/api/saveConversation", async (req, res) => {
//   const newConversation = new Conversation({
//     members: [req.body.senderId, req.body.receiverId],
//   });
//   try {
//     const savedConversation = await newConversation.save();
//     res.status(200).json(savedConversation);
//   } catch (err) {
//     res.status(500).send("Error occurred while saving conversation");
//   }
// });

const getConversationById = async (req, callback) => {
  let response = {};
  let error = {};
  try {
    const conversation = await Conversation.find({
      members: { $in: [Number(req.params.userId)] },
    });
    console.log(conversation);
    response.status = 200;
    response.details = conversation;
    return callback(null, response);
    //res.status(200).json(conversation);
  } catch (err) {
    error.status = 500;
    error.message = "Error occurred while retrieving conversations";
    error.data = err;
    return callback(error, null);
    //res.status(500).send("Error occurred while retrieving conversations");
  }
};

const getJobSeekerById = async (req, callback) => {
  console.log("inside services getJobSeekerById");
  let response = {};
  let error = {};
  const query = "select id, name from JobSeeker where id = ?";
  conn.query(query, [req.params.jobSeekerId], async function (err, rows) {
    if (err) {
      console.log("Error occurred while retreiving job seekers");
      error.status = 500;
      error.message = "Error occurred while retreiving job seekers";
      error.data = err;
      return callback(error, null);
      //res.status(400).send("Error occurred while retreiving job seekers");
    }
    console.log("Query executed: ", rows);
    response.status = 200;
    response.details = rows[0];
    console.log("sending response" +rows[0]);
    return callback(null, response);
    //res.status(200).send(rows[0]);
  });
};

// router.get("/api/getConversationById/:userId", async (req, res) => {
//   try {
//     const conversation = await Conversation.find({
//       members: { $in: [Number(req.params.userId)] },
//     });
//     console.log(conversation);
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).send("Error occurred while retrieving conversations");
//   }
// });

// router.get("/api/getJobSeekerById/:jobSeekerId", async (req, res) => {
//   const query = "select id, name from JobSeeker where id = ?";
//   conn.query(query, [req.params.jobSeekerId], async function (err, rows) {
//     if (err) {
//       console.log("Error occurred while retreiving job seekers");
//       res.status(400).send("Error occurred while retreiving job seekers");
//     }
//     console.log("Query executed: ", rows);
//     res.status(200).send(rows[0]);
//   });
// });

const getEmployerById = async (req, callback) => {
    let response = {};
    let error = {};
    const query = "select id, name from Employer where id = ?";
  conn.query(query, [req.params.employerId], async function (err, rows) {
    if (err) {
      console.log("Error occurred while retreiving employers");
      error.status = 500;
      error.message = "Error occurred while retreiving employers";
      error.data = err;
      return callback(error, null);
      //res.status(400).send("Error occurred while retreiving employers");
    }
    console.log("Query executed: ", rows);
    response.status = 200;
    response.details = rows[0];
    return callback(null, response);
    //res.status(200).send(rows[0]);
  });
};
// router.get("/api/getEmployerById/:employerId", async (req, res) => {
//   const query = "select id, name from Employer where id = ?";
//   conn.query(query, [req.params.employerId], async function (err, rows) {
//     if (err) {
//       console.log("Error occurred while retreiving employers");
//       res.status(400).send("Error occurred while retreiving employers");
//     }
//     console.log("Query executed: ", rows);
//     // response.status = 200;
//     // response.details = rows[0];
//     // return callback(null, response);
//     res.status(200).send(rows[0]);
//   });
// });

exports.getEmployerById = getEmployerById;
exports.getJobSeekerById = getJobSeekerById;
exports.saveConversation = saveConversation;
exports.getConversationById = getConversationById;

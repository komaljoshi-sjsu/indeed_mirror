const mongoose = require("mongoose");
require('../../models/Message');
const Message = mongoose.model("Message");
const conn = require("../../config/mysql_connection");

const addNewMessage = async (req, callback) => {
  let response = {};
  let error = {};
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    response.status = 200;
    response.savedMessage = savedMessage;
    return callback(null, response);
    //res.status(200).json(savedMessage);
  } catch (err) {
    error.status = 500;
    error.message = "Error occurred while adding new message";
    error.data = err;
    return callback(error, null);
    //res.status(500).send("Error occurred while adding new message");
  }
};
// router.post("/api/addNewMessage", async (req, res) => {
//   const newMessage = new Message(req.body);
//   try {
//     const savedMessage = await newMessage.save();
//     res.status(200).json(savedMessage);
//   } catch (err) {
//     res.status(500).send("Error occurred while adding new message");
//   }
// });
const getMessagesByConversationId = async (req, callback) => {
  let response = {};
  let error = {};
  try {
    console.log(req.params.conversationId);
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    console.log(messages);
    response.status = 200;
    response.messages = messages;
    return callback(null, response);
    //res.status(200).json(messages);
  } catch (err) {
    error.status = 500;
    error.message =
      "Error occurred while retrieving message by conversation id";
    error.data = err;
    return callback(error, null);
    // res
    //   .status(500)
    //   .send("Error occurred while retrieving message by conversation id");
  }
};

// router.get("/api/getMessages/:conversationId", async (req, res) => {
//   try {
//     console.log(req.params.conversationId);
//     const messages = await Message.find({
//       conversationId: req.params.conversationId,
//     });
//     console.log(messages);
//     res.status(200).json(messages);
//   } catch (err) {
//     res
//       .status(500)
//       .send("Error occurred while retrieving message by conversation id");
//   }
// });
const getAllJobSeekers = async (req, callback) => {
  let response = {};
  let error = {};
  console.log("inside get all job seekers services")
  const query = "select name as label, id as value from JobSeeker";
  conn.query(query, async function (err, rows) {
    if (err) {
      console.log("Error occurred while retreiving job seekers");
      error.status = 400;
      error.message = "Error occurred while getting dishes";
      error.data = err;
      return callback(error, null);
      //res.status(400).send("Error occurred while retreiving job seekers");
    }
    console.log("Query executed: ", rows);
    response.status = 200;
    response.details = rows;
    console.log("get all job seekers from services" + response)
    return callback(null, response);
    //res.status(200).send(rows);
  });
};

exports.getAllJobSeekers = getAllJobSeekers;
exports.getMessagesByConversationId = getMessagesByConversationId;
exports.addNewMessage = addNewMessage;

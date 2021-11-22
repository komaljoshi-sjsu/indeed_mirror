const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Conversation = mongoose.model('Conversation')

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
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
        res.status(500).send("Error occurred while retrieving conversations");
    }
});

module.exports = router;
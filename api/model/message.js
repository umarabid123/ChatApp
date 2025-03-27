const mongoose = require('mongoose');
const express = require('express');
const app = express();

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // Fixed typo
        ref: 'User',
        required: true,
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId, // Fixed typo
        ref: 'User',
        required: true,
    },
    messageType: {
        type: String,
        enum: ["text", "image"],
        required: true,
    },
    message: String, // Fixed spelling mistake (was "massage")
    imageUrl: String,
    timeStamp: {
        type: Date,
        default: Date.now,
    }
});

const Message = mongoose.model("Message", messageSchema); // Fixed "Massage" → "Message"

module.exports = Message;

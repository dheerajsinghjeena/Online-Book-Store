// import mongoose in contact.js
const mongoose = require('mongoose');

const userContact = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    address: {
        type: String, 
        required: true
    }, 

    contact: {
        type: Number, 
        required: true
    },

    message: {
        type: String, 
        required: true
    }
});

// in this we store a model create for contact us form
const userContactModal = new mongoose.model("contact", userContact);

// exporting model
module.exports = userContactModal;

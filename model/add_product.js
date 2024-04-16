// in this we will define schema and model for add product 
const mongoose = require('mongoose');

const addProductSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },

    bookId: {
        type: Number,
        required: true,
        unique: true
    },

    bookPrice: {
        type: Number,
        required: true
    },

    bookAuthor:{
        type: String, 
        required: true
    },

    bookType: {
        type: String
    },

    bookLeft: {
        type: Number,
        required: true
    }, 

    image: {
        type: String
    }

});

// exporting user schema and model 
const addProductSchemaModel = new mongoose.model("add product", addProductSchema);

module.exports = addProductSchemaModel;


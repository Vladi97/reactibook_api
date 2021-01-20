const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    details: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    date: {
        type: String,
        default: Date(Date.now()).toString()
    },
});

module.exports = mongoose.model('Post', postSchema, 'Post');
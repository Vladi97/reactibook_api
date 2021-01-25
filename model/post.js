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
    email: {
        type: String,
        require: true
    },
    privacy: {
        type: String,
        require: true
    },
    uid: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Post', postSchema, 'Post');
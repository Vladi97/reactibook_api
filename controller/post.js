const PostModel = require('../model/post');
const mongoose = require('mongoose');

exports.get_all = (req, res, next) => {
    PostModel.find()
    .exec()
    .then(docs =>{
      const response = {
          count: docs.length,
          posts: docs.map(doc => {
              return {
                details: doc.details,
                uid: doc.uid,
                date: doc.date,
                _id: doc._id
              }
          })
      };
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
}

exports.create_post = (req, res, next) => {
    console.log(req.body);
    const newPost = new PostModel({
        _id: new mongoose.Types.ObjectId(),
        details: req.body.details,
        uid: req.body.uid
    });
    newPost.save()
    .then(result => {
        res.status(201).json({
            message: 'Post created successfully',
            createdNew: {
                _id: result._id,
                details: result.details,
                date: result.date,
                uid: result.uid
            }
        });
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
}

exports.get_post = (req, res, next) => {
    const id = req.params.postId;
    PostModel.findById(id)
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                post: doc
            });
        }else{
           res.status(404).json({message: 'No valid entry for provided ID'});
        }
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
}

exports.update_post = (req, res, next) => {
    const id = req.params.postId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    PostModel.update({ _id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
}

exports.delete_post = (req, res, next) => {
    const id = req.params.postId;
    PostModel.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error:err});
    });
}
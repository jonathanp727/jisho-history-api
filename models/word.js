const { ObjectId } = require('mongodb');

const mongoUtil = require('../helpers/mongoUtil.js');

const collectionName = 'users';

exports.increment = (userId, word, callback) => {
  mongoUtil.getDb().collection(collectionName).find({
    _id: ObjectId(userId),
    words: {
      $elemMatch: { word: { $eq: word } },
    },
  }).toArray((err, result) => {
    if (result.length) {
      // increment
      mongoUtil.getDb().collection(collectionName).update({ _id: ObjectId(userId), 'words.word': word }, {
        $inc: { 'words.$.count': 1 },
        $push: { 'words.$.dates': new Date() },
      }, (err2) => {
        callback(err2);
      });
    } else {
      // add
      mongoUtil.getDb().collection(collectionName).update({
        _id: ObjectId(userId),
      }, {
        $push: {
          words: { word, count: 1, dates: [new Date()] },
        },
      }, (err2) => {
        callback(err2);
      });
    }
  });
};

exports.delete = (userId, word, callback) => {
  mongoUtil.getDb().collection(collectionName).update({
    _id: ObjectId(userId),
  }, { $pull: { words: { word } } }, (err) => {
    callback(err);
  });
};

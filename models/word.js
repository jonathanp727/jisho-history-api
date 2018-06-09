const ObjectId = require('mongodb').ObjectID;

const mongoUtil = require('../helpers/mongoUtil.js');

const collectionName = 'users';

exports.increment = (userId, word, callback) => {
  mongoUtil.getDb().collection(collectionName).find({ _id: ObjectId(userId), { words: { $elemMatch: {word: word} } } }).toArray((err, result) => {
    if(result) {
      // increment
      mongoUtil.getDb().collection(collectionName).update({ _id: ObjectId(userId), 'words.word': word }, { $inc: { 'words.$.word': 1} }, (err) => {
        callback(err);
      });
    } else {
      // add
      mongoUtil.getDb().collection(collectionName).update({ _id: ObjectId(userId), { $push: { word: word, count: 1}} }, (err) => {
        callback(err);
      });
    }
  });
}

exports.delete = (userId, word, callback) => {
  mongoUtil.getDb().collection(collectionName).update({ _id:ObjectId(userId) }, { $pull: { 'words.word': word}}), (err) => {
    callback(err);
  }
}

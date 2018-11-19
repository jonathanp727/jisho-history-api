const { ObjectId } = require('mongodb');

const mongoUtil = require('../helpers/mongoUtil.js');

const collectionName = 'users';

exports.increment = (userId, word, sentence, callback) => {
  const date = new Date().getTime();
  mongoUtil.getDb().collection(collectionName).find({
    _id: ObjectId(userId),
    words: {
      $elemMatch: { word: { $eq: word } },
    },
  }).toArray((err, result) => {
    if (result.length) {
      // Only push sentence if it's not null
      const pushObj = { 'words.$.dates': date };
      if (sentence) {
        pushObj['words.$.sentences'] = sentence;
      }

      // increment
      mongoUtil.getDb().collection(collectionName).update({ _id: ObjectId(userId), 'words.word': word }, {
        $set: { 'words.$.latestIncrement': date },
        $inc: { 'words.$.count': 1 },
        $push: pushObj,
      }, (err2) => {
        callback(err2, date);
      });
    } else {
      // Only add sentence if it's not null
      const sentenceArr = [];
      if (sentence) {
        sentenceArr.push(sentence);
      }

      const newWord = {
        word,
        count: 1,
        dates: [date],
        sentences: sentenceArr,
        latestIncrement: date,
      };

      // add
      mongoUtil.getDb().collection(collectionName).update({
        _id: ObjectId(userId),
      }, {
        $push: {
          words: newWord,
        },
      }, (err2) => {
        callback(err2, newWord);
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

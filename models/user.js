const ObjectId = require('mongodb').ObjectId;

const mongoUtil = require('../helpers/mongoUtil.js');
const cryptoUtil = require('../helpers/cryptoUtil.js');

const collectionName = 'users';

exports.all = (callback) => {
  mongoUtil.getDb().collection(collectionName).find().toArray((err, result) => {
    callback(err, result);
  });
};

exports.get = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).findOne({ _id: ObjectId(id) }, (err, result) => {
    callback(err, result);
  });
};

exports.new = (data, callback) => {
  const hashResult = cryptoUtil.saltHashPassword(data.password);
  mongoUtil.getDb().collection(collectionName).insertOne({
    data.username,
    password: hashResult.passwordHash,
    salt: hashResult.salt,
    data.isAdmin,
  }, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, data, callback) => {
  const hashResult = cryptoUtil.saltHashPassword(data.password);
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectId(id) }, {
    username: data.username,
    password: hashResult.passwordHash,
    salt: hashResult.salt,
  }, (err) => {
    callback(err);
  });
};

exports.delete = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).deleteOne({ _id: ObjectId(id) }, (err) => {
    callback(err);
  });
};

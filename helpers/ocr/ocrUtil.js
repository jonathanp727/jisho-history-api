const { exec } = require('child_process');
const fs = require('fs');

const imagesPath = __dirname + '/images/';

module.exports = {
  parseImage(filename, callback) {
    const fullname = imagesPath + filename;
    exec(`tesseract ${fullname} stdout -l jpn_vert --oem 1 --psm 3`, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        callback(err);
        return;
      }

      callback(null, stdout.replace(/\s+/g, ''));
      fs.unlink(fullname, (err2) => {
        if (err2) console.log(err2);
      });
    });
  },
};

var multer = require('multer');
var fs = require('fs');
var mkdirp = require('mkdirp');
var config = require('./config');
var path = require('path');

module.exports = multer.diskStorage({
	  destination: function (req, file, cb) {
      var date = new Date();
      var uploadDir = path.join(config.UPLOAD_PATH, date.getFullYear().toString(), date.getMonth().toString());
      fs.stat(uploadDir, function(err) {
        if(err) {
          return mkdirp(uploadDir, function(err) {
            if(err) {
              return cb(err, null);
            }
            return cb(null, uploadDir);
          });
        }
        return cb(null, uploadDir);
      });
    },
	  filename: function (req, file, cb) {
      var date = new Date();
	    cb(null, file.originalname);
	  }
	});
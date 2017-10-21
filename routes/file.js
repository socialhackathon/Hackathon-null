var express = require('express');
var router = express.Router();
var multer = require('multer');
module.exports = function(app) {
  var db = app.get('db');
  var config = app.get('config');
  var filters = app.get('filters');
  var storage = require(config.ROOT + '/storage');
  multer = multer({storage: storage});
  upload = multer.array('attachment');

  router.post('/upload', function uploadFile(req, res) {
    upload(req, res, function(err) {
      if(err || !req.files) {
        return res.json({
          success: false,
          message: req.localization.translate('upload_error'),
        })
      }
      var attachments = req.files;
      var data = [];
      attachments.forEach(function(attachment) {
        data.push(attachment.path.replace(config.UPLOAD_PATH, ''));
      });
      res.json({
        success: true,
        data: data
      });
    });
  });

  app.use('/files', router);
}

var express = require('express');

var router = express.Router();

module.exports = function(app) {

  router.get('/hello', function(req, res) {
    res.render('index.html', {name : "sdlkfjlksaf"});
  });
  app.use('/', router);
}

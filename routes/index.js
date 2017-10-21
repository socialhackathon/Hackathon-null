var express = require('express');

var router = express.Router();


module.exports = function(app) {

  var db = app.get('db');

  router.get('/', function(req, res) {
    res.render('index.html', {name : "sdlkfjlksaf"});

  });

  router.get('/about', function(req, res) {
    res.render('what.html', {});
  });

  router.get('/companies', function(req, res) {
    res.render('companies.html', {});
  });

  router.get('/publications', function(req, res) {
    res.render('publications.html', {});
  });

  router.get('/contact', function(req, res) {
    res.render('contact.html', {});
  });

 router.get('/register', function(req, res) {
    res.render('register.html', {});
  });

  app.use('/', router);
}

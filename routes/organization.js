var express = require('express');

var router = express.Router();

module.exports = function(app) {

  var helpers = app.get('helpers');
  var db = app.get('db');
  var filters = app.get('filters');
  router.get('/', function(req, res) {
    res.render('companies.html', {});
  })
  router.get('/form', filters.authRequired(), function(req, res) {
    res.render('organization-form.html', {})
  });

  router.post('/form', filters.authRequired(), function(req, res) {
    var data = req.body;
    data.creator_id = req.user.get('id');
    var organization = db.Organization.build(data);
    organization.save().then(function() {
      res.redirect('/organizations');
    }).catch(function(e) {
      console.log(e);
      res.redirect('back');
    })
  });

  app.use('/organizations', router);
};

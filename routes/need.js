var express = require('express');

var router = express.Router();

module.exports = function(app) {

  var helpers = app.get('helpers');
  var db = app.get('db');
  var filters = app.get('filters');
  router.get('/offered', filters.authRequired(), function(req, res) {
    var where = {};
    var user = req.user;
    var isOrganizator = user && user.Organizations.length != 0;
    if(!isOrganizator) {
      return res.redirect('back');
    }
    db.Need.findAll({where: {
      status: 0
    }}).then(function(needs) {
      res.render('publications.html', {needs: needs, isOrganizator: isOrganizator});
    })
  });
  router.get('/approved', function(req, res) {
    db.Need.findAll({where: {
      status: 1
    }}).then(function(needs) {
      res.render('publications.html', {needs: needs});
    })
  })
  router.get('/:id/addorg', filters.authRequired(), function(req, res) {
    db.OrganizationNeed.create({
      organization_id: req.user.Organizations[0].id,
      need_id: req.params.id
    }).then(function() {
      db.Need.update({
        status: 1
      }, {
        where: {
          id: req.params.id
        }
      }).then(function() {
        return res.json({
          success: true,
          message: "Добавлено"
        })
      })
    })
  });

  router.get('/form', function(req, res) {
    db.City.findAll().then(function(cities) {
      db.NeedCategory.findAll().then(function(categories) {
        res.render('need.html', {cities: cities, categories: categories});
      });
    });
  });

  router.post('/form', function(req, res) {
    var data = req.body;
    console.log(data);
    data.user_id = req.user.get('id');
    var need = db.Need.build(data);
    need.save().then(function() {
      res.redirect('/');
    }).catch(function(e) {
      console.log(e);
      res.redirect('back');
    })
  });

  app.use('/needs', router);
};

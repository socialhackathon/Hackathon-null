var express = require('express');

var router = express.Router();

module.exports = function(app) {

  var helpers = app.get('helpers');
  var db = app.get('db');
  var filters = app.get('filters');
  router.get('/register', function(req, res) {
    res.render('register.html', {})
  });

  router.post('/register', function(req, res) {
    var data = req.body;
    db.User.findOne({
      where: {
        email: data.email
      }
    }).then(function(user) {
      if(user) {
        return res.render('register.html', {err: "Пользователь уже зарегистрирован"});
      }
      var user = db.User.build(req.body);
      user.save().then(function(user) {
        req.session.user_id = user.get('id');
        res.redirect('/');
      }).catch(function (err) {
        res.render('/users/register', {err: "Ошибка валидации,проверьте все поля"});
      })
    })
  })
  router.get('/auth', function(req, res) {
    res.render('login.html');
  });
  router.post('/auth', function(req, res) {
    var data = req.body;
    db.User.findOne({
      where: {
        email: data.email
      }
    }).then(function(user) {
      if(!user) {
        return res.render('login.html', {err: "Пользователь еще не зарегистрирован"});
      }
      var verified = user.passwordVerify(data.password);
      if(!verified) {
        return res.render('login.html', {err: "Неправильный пароль"})
      }
      req.session.user_id = user.get('id');
      res.redirect('/');
    })
  })

  router.get('/myevents', filters.authRequired(), function(req, res) {
    db.Event.findAll({
      include: [{
        model: db.EventUser,
        where: {
          user_id: req.user.get('id')
        }
      }]
    }).then(function(events) {
      res.render('myevents.html', {events: events})
    })
  })
  router.get('/logout', filters.authRequired(), function(req, res) {
    delete req.session.user_id;
    delete req.user;
    delete req.cookies;
    res.redirect('/');
  })

  router.get('/myorg', filters.authRequired(), function(req, res) {
    db.Organization.findAll({
      where: {
        creator_id: req.user.get('id')
      }
    }).then(function(org) {
      res.render('myorg.html', {organizations: org})
    });
  });

  app.use('/users', router);
};

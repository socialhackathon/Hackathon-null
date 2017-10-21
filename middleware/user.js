module.exports = function(app, db) {
  app.use(function(req, res, next) {

    var userId = req.session && req.session.user_id;

    if (userId && !isNaN(userId)) {
      db.User.find({
        where: {
          id: userId
        },
        include: [{
          model: db.Organization
        }]
      }).then(function(user) {
        if(user) {
            req.user = user;
            res.locals.user = req.user;
        }
        next();
      });
    } else {
      next();
    }
  });
};

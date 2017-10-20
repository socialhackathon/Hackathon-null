module.exports = function(app, db) {
  app.use(function(req, res, next) {

    var userId = req.session.user_id;

    if (userId && !isNaN(userId)) {
      db.User.findById(userId).then(function(user) {
        if(user) {
            req.user = user;
        }
        next();
      });
    } else {
      delete req.session.user_id;
      next();
    }
  });
};

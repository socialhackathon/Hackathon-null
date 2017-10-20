module.exports = function(filters) {
  filters.authRequired = function(data) {
    return function(req, res, next) {
      if(!req.user) {
        res.redirect('/users/auth');
      } else {
        res.locals.user = req.user;
        next();
      }
    };
  };
  filters.adminAuthRequired = function(data) {
    return function(req, res, next) {
      if(!req.user || req.user.get('type') != 1) {
        res.redirect('/users/auth');
      } else {
        res.locals.user = req.user;
        next();
      }
    };
  }
};

module.exports = function(app) {
  app.use(function(req, res, next) {
    app.locals.url = req.url;
    next();
  });
};

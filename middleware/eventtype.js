module.exports = function(app, db) {
  app.use(function(req, res, next) {
    db.EventType.findAll().then(function(events) {
      res.locals.eventTypes = events;
      next();
    })
  });
};

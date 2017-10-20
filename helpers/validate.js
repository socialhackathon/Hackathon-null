module.exports = function(helpers) {
  helpers.catchValidationErrors = function(err, db, localization) {
    if(err instanceof db.sequelize.ValidationError) {
      var errors = err.errors;
      for(var i = 0; i < errors.length; i++) {
        errors[i].message = localization.translate(errors[i].message);
      }
      return ({
        success: false,
        message: localization.translate('validation_error'),
        errors: errors
      })
    }
    console.log(err);
    return ({
      success: false,
      message: localization.translate('unknown_error')
    })
  }
}
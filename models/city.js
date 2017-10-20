var bcrypt = require('bcrypt');
var randomstring = require("randomstring");
module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input_first_name'
        }
      }
    },
  }, {
    underscored: true,
    hooks: {},
  });

  City.associate = function(models) {
  };

  return City;
}

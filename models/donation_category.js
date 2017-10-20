var bcrypt = require('bcrypt');
var randomstring = require("randomstring");
module.exports = function(sequelize, DataTypes) {
  var DonationCategory = sequelize.define('DonationCategory', {
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

  DonationCategory.associate = function(models) {
  };

  return DonationCategory;
};

var bcrypt = require('bcrypt');
var randomstring = require("randomstring");
module.exports = function(sequelize, DataTypes) {
  var Donation = sequelize.define('Donation', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'user_id cannot be null'
        }
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'user_id cannot be null'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 0
    }
  }, {
    underscored: true,
    hooks: {},
  });

  Donation.associate = function(models) {
    this.belongsTo(models.User, {foreignKey: "user_id"});
    this.belongsTo(models.DonationCategory, {foreignKey: "category_id"});
  };

  return Donation;
};

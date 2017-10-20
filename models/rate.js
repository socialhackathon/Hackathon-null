var bcrypt = require('bcrypt');
var randomstring = require("randomstring");
module.exports = function(sequelize, DataTypes) {
  var Rate = sequelize.define('Rate', {
    rate: {
      type: DataTypes.INTEGER,//От 0 до 5
      allowNull: false,
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'organization_id cannot be null'
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'need_id cannot be null'
        }
      }
    },
  }, {
    underscored: true,
    hooks: {},
  });

  Rate.associate = function(models) {
    this.belongsTo(models.Organization, {foreignKey: "organization_id"});
    this.belongsTo(models.User, {foreignKey: 'user_id'});
  };

  return Rate;
};

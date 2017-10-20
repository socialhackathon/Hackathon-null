var bcrypt = require('bcrypt');
var randomstring = require("randomstring");
module.exports = function(sequelize, DataTypes) {
  var Organization = sequelize.define('Organization', {
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
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'creator_id cannot be null'
        }
      }
    },
    web_site: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    logo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    underscored: true,
    hooks: {},
  });

  Organization.associate = function(models) {
    this.belongsTo(models.User, {foreignKey: "creator_id"});
    this.hasMany(models.OrganizationNeed, {foreignKey: 'organization_id'});
  };

  return Organization;
};

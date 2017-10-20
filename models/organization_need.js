var bcrypt = require('bcrypt');
var randomstring = require("randomstring");
module.exports = function(sequelize, DataTypes) {
  var OrganizationNeed = sequelize.define('OrganizationNeed', {
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'organization_id cannot be null'
        }
      }
    },
    need_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  OrganizationNeed.associate = function(models) {
    this.belongsTo(models.Organization, {foreignKey: "organization_id"});
    this.belongsTo(models.Need, {foreignKey: "need_id"});
  };

  return OrganizationNeed;
};

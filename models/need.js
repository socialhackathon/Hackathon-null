var bcrypt = require('bcrypt');
var randomstring = require("randomstring");
module.exports = function(sequelize, DataTypes) {
  var Need = sequelize.define('Need', {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'user_id cannot be null'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 0  //0-public, 1-anonym
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      defaultValue: 0
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'city_id cannot be null'
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
  }, {
    underscored: true,
    hooks: {},
  });

  Need.associate = function(models) {
    this.belongsTo(models.User, {foreignKey: "user_id"});
    this.belongsTo(models.NeedCategory, {foreignKey: "category_id"});
    this.belongsTo(models.City, {foreignKey: 'city_id'});
    this.hasMany(models.OrganizationNeed, {foreignKey: 'need_id'});
  };

  return Need;
};

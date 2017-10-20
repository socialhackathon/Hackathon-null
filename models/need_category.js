var bcrypt = require('bcrypt');
var randomstring = require("randomstring");
module.exports = function(sequelize, DataTypes) {
  var NeedCategory = sequelize.define('NeedCategory', {
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

  NeedCategory.associate = function(models) {
    this.belongsTo(models.User, {foreignKey: "creator_id"})
  };

  return NeedCategory;
};

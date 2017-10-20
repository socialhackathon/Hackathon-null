var bcrypt = require('bcrypt');
var randomstring = require("randomstring");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input_first_name'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input_last_name'
        }
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input_email'
        }
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: {
        args: true,
        msg: 'unique_field_phone'
      },
      validate: {
        isNumeric: {
          args: true,
          msg: 'incorrect_type_of_phone'
        },
        notEmpty: {
          args: true,
          msg: 'input_user_phone'
        },
        len: {
          args: [6, 20],
          msg: 'length_of_phone_must_be_btw_6_20'
        },
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'input_user_password'
        },
        len: {
          args: [6],
          msg: 'min_length_of_password_6'
        }
      }
    },
    type: { // 0 - User, 1 - Admin
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING(100)
    }
  }, {
    underscored: true,
    hooks: {
      beforeUpdate: function(user) {
        if(user.changed('password')) {
          user.set('password', bcrypt.hashSync(user.get('password'), bcrypt.genSaltSync(10)));
        }
      },
      beforeCreate: function(user) {
        var salt = randomstring.generate(7);
        user.set('salt', salt);
        user.set('password', bcrypt.hashSync(user.get('salt') + user.get('password'), bcrypt.genSaltSync(10)));
      }
    },
  });

  User.prototype.passwordVerify = function(password) {
    return bcrypt.compareSync(this.get('salt') + password, this.get('password'));
  };

  User.associate = function(models) {
    
  };

  return User;
};

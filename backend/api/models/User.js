'use strict';

/**
 * User
 * @description :: Model for storing users
 * @name global.User
 */
module.exports = {
  schema: true,
  autoCreatedBy: true,
  autoUpdatedBy: true,
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },

    password: {
      type: 'string'
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    firstName: {
      type: 'string',
      defaultsTo: ''
    },

    lastName: {
      type: 'string',
      defaultsTo: ''
    },

    accountType: {
      type: 'string',
      defaultsTo: 'local'
    },

    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    },

    group: {
      model: 'Group'
    },

    toJSON () {
      let obj = this.toObject();
      delete obj.password;

      return obj;
    }
  },

  beforeUpdate (values, next) {
    if (false === values.hasOwnProperty('password')) return next();
    if (/^\$2[aby]\$[0-9]{2}\$.{53}$/.test(values.password)) return next();

    return HashService.bcrypt().hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  },

  beforeCreate (values, next) {
    if (false === values.hasOwnProperty('password')) return next();

    return HashService.bcrypt().hash(values.password)
      .then(hash => {
        values.password = hash;
        next();
      })
      .catch(next);
  }
};

'use strict';

/**
 * OS
 * @description
 * @name global.OS
 */
module.exports = {
  schema: true,
  autoCreatedBy: true,
  autoUpdatedBy: true,
  attributes: {
    abbreviation: {
      type: 'string',
      maxLength: 8,
      required: true
    },
    description: {
      type: 'string'
    },
    version: {
      type: 'json'
    }
  },
  beforeUpdate (values, next) {
    values.abbreviation = values.abbreviation.toUpperCase();
    next();
  },
  beforeCreate (values, next) {
    values.abbreviation = values.abbreviation.toUpperCase();
    next();
  }
};

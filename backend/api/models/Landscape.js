'use strict';

/**
 *
 * @description :: Model for storing users
 * @name global.
 */
module.exports = {
  schema: true,
  autoCreatedBy: true,
  autoUpdatedBy: true,
  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    abbreviation: {
      type: 'string',
      required: true,
      unique: true
    },
    // associations
    tier: {
      collection: 'Tier',
      via: 'landscape'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};

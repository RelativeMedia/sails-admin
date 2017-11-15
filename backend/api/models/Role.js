'use strict';

/**
 * Role
 * @description
 * @name global.Role
 */
module.exports = {
  schema: true,
  autoCreatedBy: true,
  autoUpdatedBy: true,
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    abbreviation: {
      type: 'string',
      required: true,
      unique: true
    },
    // associations
    server: {
      collection: 'Server',
      via: 'roles'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};

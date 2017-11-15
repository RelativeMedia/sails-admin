'use strict';

/**
 * Component
 * @description
 * @name global.Component
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
    servers: {
      collection: 'Server',
      via: 'component'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};



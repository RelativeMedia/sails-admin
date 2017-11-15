'use strict';

/**
 * Tier
 * @description
 * @name global.Tier
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
    landscape: {
      collection: 'Landscape',
      via: 'tier'
    },
    servers: {
      collection: 'Server',
      via: 'tier'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};

'use strict';

/**
 * Comment
 * @description
 * @name global.Comment
 */
module.exports = {
  schema: true,
  autoCreatedBy: true,
  autoUpdatedBy: true,
  attributes: {
    comment: {
      type: 'string',
      required: true
    },

    // associations
    server: {
      collection: 'Server',
      via: 'comments'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};

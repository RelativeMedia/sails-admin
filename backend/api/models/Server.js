'use strict';
const _ = require('lodash');

/**
 * Server
 * @description
 * @name global.Server
 */

// transforms select attributes to uppercase
const transformToUpperCase = (values, cb) => {
  if (values.stack) {
    values.stack = values.stack.toUpperCase();
  }

  if (values.hostname) {
    values.hostname = values.hostname.toUpperCase();
  }

  if (values.sid) {
    values.sid = values.sid.toUpperCase();
  }

  if (values.aliases && values.aliases.length > 0) {
    _.each(values.aliases, (alias, i) => {
      values.aliases[i] = alias.toUpperCase();
    });
  }
  cb();
};

module.exports = {
  schema: true,
  autoCreatedBy: true,
  autoUpdatedBy: true,
  attributes: {
    hostname: {
      type: 'string',
      required: true,
      unique: true
    },
    aliases: {
      type: 'array'
    },
    sid: {
      type: 'string'
    },
    memory: {
      type: 'string'
    },
    swap: {
      type: 'string'
    },
    cpu: {
      type: 'string'
    },
    ipv4: {
      type: 'string'
    },
    stack: {
      type: 'string'
    },

    // associations
    component: {
      model: 'Component'
    },
    os: {
      model: 'OS'
    },
    roles: {
      collection: 'Role',
      via: 'server'
    },
    tier: {
      model: 'Tier'
    },
    comments: {
      collection: 'Comment',
      via: 'server'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  },
  beforeUpdate (values, next) {
    transformToUpperCase(values, next);
  },
  beforeCreate (values, next) {
    transformToUpperCase(values, next);
  }
};

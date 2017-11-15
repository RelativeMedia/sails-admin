"use strict";

/**
 * Test environment settings
 * @description :: This section overrides all other config values ONLY in test environment
 */

module.exports = {
  baseUrl: 'http://localhost:1337/v1',
  port: 1337,
  log: {
    level: 'silent'
  },
  models: {
    connection: 'memory',
    migrate: 'drop'
  },
  hooks: {
    grunt: false,
    pubsub: false,
    views: false
  }
};

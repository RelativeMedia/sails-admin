"use strict";

/**
 * Development environment settings
 * @description :: This section overrides all other config values ONLY in development environment
 */

module.exports = {
  baseUrl: 'http://localhost:1337/v1',
  port: 1337,
  log: {
    level: 'debug'
  },
  models: {
    connection: 'disk'
  }
};

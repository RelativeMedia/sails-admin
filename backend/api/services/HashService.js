"use strict";

const hash = require('sails-service-hash');
const _    = require('lodash');
/**
 * @name global.HashService
 * @type {{bcrypt: *}}
 */
module.exports = {
  bcrypt: (config) => hash('bcrypt', _.merge({}, sails.config.services.hash.bcrypt, config))
};

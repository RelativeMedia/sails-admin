"use strict";

const cipher = require('sails-service-cipher');
const _      = require('lodash');

/**
 * @name global.CipherService
 * @type {{jwt: *}}
 */
module.exports = {
  jwt: (config) => cipher('jwt', _.merge({}, sails.config.services.cipher.jwt, config))
};

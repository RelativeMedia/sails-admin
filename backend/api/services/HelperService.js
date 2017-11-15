const slugify = require('slugify');
const _       = require('lodash');

/**
 * @name global.HelperService
 * @type {{bcrypt: *}}
 */
module.exports = {
  slugify: (string, config = { lower: true }) => slugify(string, _.merge({}, sails.config.services.cipher.slugify, config))
};

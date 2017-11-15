"use strict";

const mailer = require('sails-service-mailer');
const _      = require('lodash');

/**
 * @name global.MailerService
 */
module.exports = (config) => mailer('sendmail', _merge({}, sails.config.services.mailer, config));

'use strict';

/**
 * AuthController
 * @description :: Server-side logic for manage users' authorization
 * @name global.AuthController
 */

const _ = require('lodash');
const passport = require('passport');

module.exports = {
  /**
   * Login
   * @param req
   * @param res
   */
  login (req, res) {
    switch (req.param('id')) {
    case 'ad':
      passport.authenticate('ActiveDirectory', _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
      break;
    case 'local':
    default:
      passport.authenticate('local', _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
      break;
    }
  },

  /**
   * Sign up by email\password
   * @param req
   * @param res
   */
  register (req, res) {
    const values = _.omit(req.allParams(), 'id');

    User
      .create(values)
      .then(user => {
        return {token: CipherService.jwt().encodeSync({id: user.id}), user: user}
      })
      .then(res.created)
      .catch(res.negotiate);
  },

  /**
   * Accept JSON Web Token and updates with new one
   * @param req
   * @param res
   */
  refresh_token (req, res) {
    if (!req.param('token')) return res.badRequest(null, {message: 'You must provide token parameter'});

    sails.log.debug(req.param('token'));

    const oldDecoded = CipherService.jwt().decodeSync(req.param('token'));

    sails.log.debug(oldDecoded);

    res.ok({
      token: CipherService.jwt().encodeSync({id: oldDecoded.id})
    });
  }
};

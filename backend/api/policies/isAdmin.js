"use strict";

/**
 * isAdmin
 * @description :: Policy that inject user in `req` via JSON Web Token
 */
module.exports = function (req, res, next) {
  let error = {};

  if (!req.user.group) {
    error.status = 500;
    return res.negotiate(error);
  }

  if (req.user.group.slug !== 'admins') {
    error.status = 403;
    error.code = 'E_FORBIDDEN';
    error.message = 'User not authorized to perform the operation';
    return res.negotiate(error);
  }

  return next();

};

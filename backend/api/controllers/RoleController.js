'use strict';

/**
 * RoleController
 * @description
 * @name global.RoleController
 */
module.exports = {
  unique (req, res) {
    Role
      .count(req.body)
      .then(res.ok)
      .catch(res.negotiate);
  }
};

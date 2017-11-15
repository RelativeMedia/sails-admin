'use strict';

/**
 * OSController
 * @description
 * @name global.OSController
 */
module.exports = {
  unique (req, res) {
    OS
      .count(req.body)
      .then(res.ok)
      .catch(res.negotiate);
  }
};

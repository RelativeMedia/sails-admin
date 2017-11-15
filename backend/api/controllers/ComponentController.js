'use strict';

/**
 * ComponentController
 * @description
 * @name global.ComponentController
 */
module.exports = {
  unique (req, res) {
    Component
      .count(req.body)
      .then(res.ok)
      .catch(res.negotiate);
  }
};


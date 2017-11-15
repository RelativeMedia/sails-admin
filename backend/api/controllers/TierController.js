'use strict';

/**
 * TierController
 * @description
 * @name global.TierController
 */
module.exports = {
  unique (req, res) {
    Tier
      .count(req.body)
      .then(res.ok)
      .catch(res.negotiate);
  }
};

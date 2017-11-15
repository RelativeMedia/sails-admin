'use strict';

/**
 * LandscapeController
 * @description
 * @name global.LandscapeController
 */
module.exports = {
  unique (req, res) {
    Landscape
      .count(req.body)
      .then(res.ok)
      .catch(res.negotiate);
  }
};

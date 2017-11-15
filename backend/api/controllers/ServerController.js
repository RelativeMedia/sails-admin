'use strict';

/**
 * ServerController
 * @description
 * @name global.ServerController
 */
module.exports = {
  unique (req, res) {
    Server
      .count(req.body)
      .then(res.ok)
      .catch(res.negotiate);
  }
};

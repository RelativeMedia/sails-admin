'use strict';

/**
 * UserController
 * @description handles the api for the user data
 * @name global.UserController
 */
module.exports = {
  profile: (req, res) => {
    User
      .findOne({
        id: req.user.id
      })
      .populateAll()
      .then((user) => {
        if (!user) return res.negotiate();
        return res.json(user);
      })
      .catch((err) => res.negotiate(err));
  }
};

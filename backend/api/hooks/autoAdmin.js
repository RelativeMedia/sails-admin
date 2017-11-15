const _ = require('lodash');
module.exports = (sails) => {
  return {
    defaults: {
      autoAdmin: {
        enabled: false,
        user: {
          username: 'admin',
          password: 'password',
          firstName: 'Gordon',
          lastName: 'Freeman',
          email: 'admin@demo.com',
          group: 'admins'
        },
        group: {
          name: 'Admins',
          slug: 'admins'
        }
      }
    },
    initialize: (cb) => {
      const config = sails.config.autoAdmin
      if (!config.enabled) {
        sails.log.verbose('autoAdmin hook skipped. Set sails.config.autoAdmin.enable to true to enable it in config/autoAdmin.')
        return cb()
      }

      sails.log.verbose('Loading hook: autoAdmin')
      sails.after('hook:orm:loaded', () => {


        const createUser = (user) => {
          return User
          .findOrCreate(
            {
              username: user.username
            }, user)
          .then((user) => {
            sails.log.verbose('hooks: autoAdmin initialized.')
            sails.log('--------------------------------------------------------'.grey);
            sails.log(':: AutoAdmin Information'.grey);
            sails.log('--------------------------------------------------------'.grey);
            sails.log('Username    : ' + user.username); // 12 - 8 = 4 spaces
            sails.log('Password    : ' + config.user.password);
            sails.log('First Name  : ' + user.firstName);
            sails.log('Last Name   : ' + user.lastName);
            sails.log('Email       : ' + user.email);
            return user;
          })
          .catch((err) => {
            sails.log.error('hooks: autoAdmin - Error bootstrapping the default admin account');
            sails.log.error(err);

            return new Error('hooks: autoAdmin - Error bootstrapping the default admin account');
          });
        }
        if (sails.config.autoAdmin.group) {
          Group
            .findOrCreate({
              name: sails.config.autoAdmin.group.name,
              slug: sails.config.autoAdmin.group.slug
            }, sails.config.autoAdmin.group)
            .then((group) => {
              return createUser(_.merge({}, sails.config.autoAdmin.user, {group: group.id}))
            })
            .then((user) => {
              cb();
            })
            .catch((error) => {
              cb(error);
            });
        } else {
          createUser(sails.config.autoAdmin.user)
          .then((user) => {
            cb();
          })
          .catch((error) => {
            cb(error);
          });
        }
      });
    }

  }
};

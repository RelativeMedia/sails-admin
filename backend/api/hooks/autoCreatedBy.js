const _ = require('lodash');

module.exports = (sails) => {
  const installModelOwnership = () => {
    let models = sails.models;
    if (sails.config.models.autoCreatedBy === false) return;
    _.each(models, model => {
      if (model.autoCreatedBy === false) return;

      _.defaults(model.attributes, {
        createdBy: {
          model: 'User',
          index: true
        },
        owner: {
          model: 'User',
          index: true
        }
      })
    })
  }
  const initialize = (cb) => {
    installModelOwnership();
    sails.after('hook:orm:loaded', () => {
      sails.log.debug('Hook:: autoCreatedBy() :: initialized.');
      return cb();
    })
  };


  return {
    initialize,
    installModelOwnership
  }
};

"use strict";

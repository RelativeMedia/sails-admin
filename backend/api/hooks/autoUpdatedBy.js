const _ = require('lodash');

module.exports = (sails) => {
  const installModelOwnership = () => {
    let models = sails.models;
    if (sails.config.models.autoUpdatedBy === false) return;
    _.each(models, model => {
      if (model.autoUpdatedBy === false) return;

      _.defaults(model.attributes, {
        updatedBy: {
          model: 'User',
          index: true
        }
      })
    })
  }
  const initialize = (cb) => {
    installModelOwnership();
    sails.after('hook:orm:loaded', () => {
      sails.log.debug('Hook:: autoUpdatedBy() :: initialized.');
      return cb();
    })
  };


  return {
    initialize,
    installModelOwnership
  }
};

"use strict";

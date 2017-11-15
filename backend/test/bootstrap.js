const Sails = require('sails');
const config = require('../config/env/test');
const Barrels = require('barrels');

let sails;

before(done => {
  Sails.lift(config, (error, server) => {
    if (error) return done(error);

    sails = server;

    const barrels = new Barrels();
    const fixtures = barrels.data;

    barrels.populate((err) => {
      return done(err, sails)
    });

  });
});

after(done => sails.lower(done));

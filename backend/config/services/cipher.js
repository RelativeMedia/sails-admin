'use strict';

module.exports = {
  services: {
    cipher: {
      jwt: {
        secretKey: process.env.CIPHER_SERVICE_SECRET,
        expiresIn: 600 * 24 // When will this token expire in seconds
      }
    }
  }
};


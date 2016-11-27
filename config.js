'use strict';

let config = {
  es: {
      host: 'localhost:9200',
      log: 'error',
      httpAuth: 'username:password',
  }
};

try {
    const localConfig = require('./config.local');
    config = Object.assign(config, localConfig);
} catch (e) {

}

module.exports = config;

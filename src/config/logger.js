const winston = require('winston');
const settings = require('../config/settings');
const crypto = require('crypto');

function hash(data) {
  return crypto.createHmac('sha256', data).digest('hex');
}

module.exports = (_prefix) => {
  const prefix = _prefix;
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: settings.logging.consoleLevel
      })
    ]
  });

  const obj = {
    correlationId: '',

    info(message) {
      // this.sendLogToDB('info', args);
      logger.info(message);
    },

    debug(message) {
      // this.sendLogToDB('debug', message);
      logger.debug(message);
    },

    warn(message) {
      // this.sendLogToDB('warn', message);
      logger.warn(message);
    },

    error(message) {
      // this.sendLogToDB('error', message);
      logger.error(message);
    },

    configureFormat() {
      logger.format = winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
          return '[' + info.timestamp + '] '
            + this.correlationId
            + ' '
            + prefix
            + ' - '
            + info.message;
        })
      );
    },
  };


  obj.correlationId = hash((new Date().getTime() + Math.random()).toString());
  obj.configureFormat();

  return obj;
};

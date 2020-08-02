const Logger = require('./config/logger')
const logger = Logger('[Starter]')

require('./config/database')();

const start = () => {
  logger.info('starting system');
}

module.exports = start();

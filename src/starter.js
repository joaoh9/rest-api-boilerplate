const Logger = require('./config/logger')
const logger = Logger('[Starter]')

require('./config/express')()

const start = () => {
  logger.info('starting system');
}

module.exports = start();

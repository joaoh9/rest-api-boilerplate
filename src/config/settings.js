require('dotenv/config')

module.exports = {
  mongo: {
    url: `mongodb://${process.env.DB_SERVER}/${process.env.DB_NAME}`,
    dbServer: process.env.DB_SERVER,
    dbName: process.env.DB_NAME,
    isMongoDebug: false,
  },
  servicePort: process.env.PORT,
  logging: {
    consoleLevel: process.env.LOGGING_CONSOLE_LEVEL || 'debug',
    // DEBUG
    // INFO
    // WARN
    // ERROR
  },
};

const { user } = require("../daos");
const dao = user();

const Logger = require('../config/logger');
const logger = Logger('[UserBO]');

module.exports = {
  save(entity) {
    logger.debug('Entity received for save ' + JSON.stringify(entity))
    return new Promise((resolve, reject) => {
      dao.getByEmail(entity.email)
        .then(res => {
          logger.debug(`Users found on email search: ${JSON.stringify(res)} `)
          if (!res) {
            logger.info(`No user found with this email: ${entity.email}`)
            return dao.getByUsername(entity.username)
          }
          logger.info(`User found with email ${entity.email}`)
          throw { status: 409, message: 'There is already a registered user with this email' }
        })
        .then(res => {
          logger.debug(`Users found on search: ${JSON.stringify(res)} `)
          if (!res) {
            logger.info(`No user found with this username: ${entity.username}`)
            return dao.save(entity)
          }
          logger.info(`User found with username ${entity.username}`)
          throw { status: 409, message: 'There is already a registered user with this username' }
        })
        .then(resolve)
        .catch(err => {
          logger.error('Something went wrong when saving a new user: ' + JSON.stringify(err))
          return reject(err);
        });
    });
  },
  getAll() {
    logger.debug('Getting all users')
    return new Promise((resolve, reject) => {
      dao.getAll().then(resolve).catch(reject);
    });
  },
  getById(id) {
    logger.debug(`Getting user by id ${id}`)
    return new Promise((resolve, reject) => {
      dao.getById(id).then(resolve).catch(reject);
    });
  },
};

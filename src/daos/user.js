const { user } = require("../models");
const Logger = require("../config/logger");
const logger = Logger('[UserDAO]')

const model = user();

const modelParser = require('../models/modelParser')()

module.exports = () => {
  const doNotShow = {
    __v: false
  }
  return {
    save(entity) {
      logger.debug(`Saving user ${JSON.stringify(entity)} on DB`)
      return new Promise((resolve, reject) => {
        model
          .create(entity)
          .then((item) => this.getById(item._id))
          .then(resolve)
          .catch((e) => reject({ status: 422, message: e.message }));
      });
    },
    getById(id) {
      logger.debug(`Getting user by id ${id}`)
      return new Promise((resolve, reject) => {
        this.getAll({ _id: id }, doNotShow)
          .then((users) =>
            users.length > 0
              ? resolve(modelParser.clear(users[0]))
              : reject({ status: 404, message: "User not Found" })
          )
          .catch(reject);
      });
    },
    getAll(filter, projection = doNotShow) {
      logger.debug(`Getting all users by filter ${JSON.stringify(filter)}, with projection fields: ${JSON.stringify(projection)}`)
      return new Promise((resolve, reject) => {
        model.find(filter, projection).lean().exec().then(res => {
          logger.debug(`Users found: ${JSON.stringify(res)}`)
          return resolve(res)
        }).catch(reject);
      });
    },
    getByEmail(email) {
      return new Promise((resolve, reject) => {
        logger.debug('Getting user by email ' + email)
        this.getAll({
          email
        })
          .then(users => {
            logger.debug(`Users found with email ${email}: ${JSON.stringify(users)}`)
            return users.length > 0 ? resolve(users[0]) : resolve(null)
          })
          .catch(reject)
      })
    },
    getByUsername(username) {
      logger.debug(`Getting user by username ${username}`)
      return new Promise((resolve, reject) => {
        this.getAll({
          username
        })
        .then(users => {
          logger.debug(`Users found with username ${username}: ${JSON.stringify(users)}`)
          return users.length > 0 ? resolve(users[0]) : resolve(null)
        })
          .catch(reject)
      })
    },
  }
}

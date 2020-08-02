const { user } = require("../models");
const model = user();

const modelParser = require('../models/modelParser')

module.exports = () => {
  const doNotShow = {
    __v: false
  }
  return {
    save(entity) {
      return new Promise((resolve, reject) => {
        model
          .create(entity)
          .then((item) => this.getById(item._id))
          .then(resolve)
          .catch((e) => reject({ status: 422, message: e.message }));
      });
    },
    getById(id) {
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
      return new Promise((resolve, reject) => {
        model.find(filter, projection).lean().exec().then(resolve).catch(reject);
      });
    },
    getByEmail(email) {
      return new Promise((resolve, reject) => {
        this.getAll({
          email
        })
          .then(users =>
            users.length > 0 ? resolve(users[0]) : resolve(null)
          )
          .catch(reject)
      })
    },
    getByUsername(username) {
      return new Promise((resolve, reject) => {
        this.getAll({
          username
        })
          .then(users =>
            users.length > 0 ? resolve(users[0]) : resolve(null)
          )
          .catch(reject)
      })
    },
  }
}

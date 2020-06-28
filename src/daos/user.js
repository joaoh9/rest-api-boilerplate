const { user } = require("../models");
const model = user();

module.exports = () => ({
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
      this.getAll({ _id: id })
        .then((users) =>
          users.length > 0
            ? resolve(users[0])
            : reject({ status: 404, message: "User not Found" })
        )
        .catch(reject);
    });
  },
  getAll(filter) {
    return new Promise((resolve, reject) => {
      model.find(filter).lean().exec().then(resolve).catch(reject);
    });
  },
});

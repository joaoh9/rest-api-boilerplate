const { user } = require("../daos");
const dao = user();

module.exports = {
  save(entity) {
    return new Promise((resolve, reject) => {
      dao.save(entity).then(resolve).catch(reject);
    });
  },
  getAll() {
    return new Promise((resolve, reject) => {
      dao.getAll().then(resolve).catch(reject);
    });
  },
  getById(id) {
    return new Promise((resolve, reject) => {
      dao.getById(id).then(resolve).catch(reject);
    });
  },
};

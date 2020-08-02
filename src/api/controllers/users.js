const { users } = require("../../business");
const bo = users
const { HttpResponses } = require("../../helper");

const Logger = require('../../config/logger')
const logger = Logger('[UserController]')

module.exports = () => ({
  save(req, res) {
    const rh = new HttpResponses(req, res);
    logger.debug('Post request received on /v1/users')
    bo.save(req.body).then(rh.ok).catch(rh.error);
  },
  getAll(req, res) {
    const rh = new HttpResponses(req, res);
    bo.getAll({}).then(rh.ok).catch(rh.error);
  },
  getById(req, res) {
    const rh = new HttpResponses(req, res);
    bo.getById(req.params.id).then(rh.ok).catch(rh.error);
  },
  getByEmail(req, res) {
    const rh = new HttpResponses(req, res);
    bo.getByEmail(req.params.email).then(rh.ok).catch(rh.error)
  },
  getByUsername(req, res) {
    const rh = new HttpResponses(req, res);
    bo.getByUsername(req.params.username).then(rh.ok).catch(rh.error)
  },
});



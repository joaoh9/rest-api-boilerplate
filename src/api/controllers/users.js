const { users } = require("../../business");
const bo = users
const { HttpResponses } = require("../../helper");

module.exports = () => ({
  save(req, res) {
    const rh = new HttpResponses(req, res);
    bo.save(req.body).then(rh.ok).catch(rh.error);
  },
  getAll(req, res) {
    const rh = new HttpResponses(req, res);

    bo.getAll({}).then(rh.ok).catch(rh.error);
  },
});



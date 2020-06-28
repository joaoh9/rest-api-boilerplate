const { Router } = require("express");

const router = new Router();

const { users } = require("../controllers");
const controller = users();

router.post("/", controller.save);

exports.router = router
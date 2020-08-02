const { Router } = require("express");

const router = new Router();

const { users } = require("../controllers");
const controller = users();

router.post("/", controller.save);
router.get("/:id", controller.getById);
router.get("/email/:email", controller.getByEmail);
router.get("/username/:username", controller.getByUsername);

exports.router = router
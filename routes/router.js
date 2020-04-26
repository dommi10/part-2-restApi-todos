var express = require("express");
var router = express.Router();
var controller = require("../controller");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/todos", controller.todoCtl.todos);

router.post("/user/add", controller.userCtl.signup);
router.post("/user/login", controller.userCtl.login);

module.exports = router;

let router = require("express").Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.use("/auth", require("./auth.router"))
router.use("/users", require("./user.router"))

module.exports = router
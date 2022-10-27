let router = require("express").Router()
const { user } = require("../controllers/index")

router.get("/add/:uuid",user.addScore)
router.get("/reset/:uuid",user.resetScore)
router.get("/:uuid",user.getUsers);



module.exports = router;
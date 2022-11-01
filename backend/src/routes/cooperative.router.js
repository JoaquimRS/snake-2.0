let router = require("express").Router()
const { user } = require("../controllers/index")

router.get("/",user.getRankingCopUsers)
router.get("/add/:uuid",user.addCopScore)
router.get("/reset/:uuid",user.resetCopScore)
router.get("/:uuid",user.getCopUsers);



module.exports = router;
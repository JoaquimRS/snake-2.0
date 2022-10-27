let router = require("express").Router()
const { auth } = require("../controllers/index")

router.post("/login",auth.login);
router.post("/register",auth.register);
router.get("/all",auth.getUsers);
router.delete("/:uuid",auth.deleteOne)



module.exports = router;
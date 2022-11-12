const { register, login, getAllUsers, addMessage, getMessage, home } = require("../controllers/usersController");

const router = require("express").Router();

router.get("/", home);

router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", getAllUsers);

router.post("/addmsg", addMessage);
router.get("/getmsg", getMessage);

module.exports = router;
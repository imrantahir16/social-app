const router = require("express").Router();
const { loginUser } = require("../controllers/loginController");
const { registerUser } = require("../controllers/registerController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

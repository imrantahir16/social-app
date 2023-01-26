const router = require("express").Router();
const {
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

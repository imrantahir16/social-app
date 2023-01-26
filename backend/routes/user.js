const router = require("express").Router();
const {
  getUser,
  deleteUser,
  updateUser,
  followUser,
  unfollowUser,
} = require("../controllers/userController");

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

module.exports = router;

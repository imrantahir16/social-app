const router = require("express").Router();
const {
  getUser,
  deleteUser,
  updateUser,
  followUser,
  unfollowUser,
  getFriends,
} = require("../controllers/userController");

router.get("/", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);
router.get("/friend/:userId", getFriends);

module.exports = router;

const router = require("express").Router();
const {
  createPost,
  getPost,
  deletePost,
  updatePost,
  likePost,
  getTimelinePost,
} = require("../controllers/postController");

router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/timeline/all", getTimelinePost);

module.exports = router;

const router = require("express").Router();
const {
  createPost,
  getPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");

router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;

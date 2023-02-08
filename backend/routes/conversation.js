const router = require("express").Router();
const {
  newConversation,
  getConversation,
} = require("../controllers/conversationController");

router.post("/", newConversation);
router.get("/:userId", getConversation);
router.get("/find/:firstUserId/:secondUserId", getConversation);

module.exports = router;

const router = require("express").Router();
const {
  newConversation,
  getConversation,
  getConversationTwoUser,
} = require("../controllers/conversationController");

router.post("/", newConversation);
router.get("/:userId", getConversation);
router.get("/find/:firstUserId/:secondUserId", getConversationTwoUser);

module.exports = router;

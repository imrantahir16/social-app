const router = require("express").Router();
const { addMessage, getMessages } = require("../controllers/messageController");

router.post("/", addMessage);
router.get("/:conversationId", getMessages);

module.exports = router;

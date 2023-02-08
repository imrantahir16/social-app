const Conversation = require("../model/Conversation");

const newConversation = async (req, res) => {
  const conversation = new Conversation({
    members: [req.body.senderId, req.body.recieverId],
  });

  try {
    const savedConversation = conversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json({ conversation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { newConversation, getConversation };

const User = require("../model/Users");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username }).exec();
    !foundUser && res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, foundUser.password);
    !match && res.status(400).json("Incorrect password");

    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser };
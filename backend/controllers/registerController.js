const User = require("../model/Users");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const { username, email, password } = req.body;
  console.log(username, email, password);
  const userExists = await User.findOne({ username }).exec();

  userExists && res.status(409).json({ message: "User already exists" });

  try {
    // generate salt and hashedPassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };

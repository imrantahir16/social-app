const User = require("../model/Users");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  !req.params.id && res.status(400).json({ message: "User ID is required" });

  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    // console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ message: `User with an ID of ${req.params.id} not found` });
    }
    const { password, updatedAt, ...others } = user?._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  !req.params.id && res.status(400).json({ message: "User ID is required" });
  !req.body.userId && res.status(400).json({ message: "User ID is required" });
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(403).json("You can only delete your account!");
  }
};

const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can only update your account" });
  }
};

const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already followed this user");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You can not follow yourself");
  }
};

const unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You already unfollowed this user");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You can not unfollow yourself");
  }
};

module.exports = { getUser, deleteUser, updateUser, followUser, unfollowUser };

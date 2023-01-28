const Post = require("../model/Post");
const Users = require("../model/Users");

const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ message: `Post with an ID of ${req.params.is} not found` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      res.status(403).json("Unauthorized to delete post");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json("Post updated");
    } else {
      res.status(403).json("Unauthorized to update post");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// like or dislike a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTimelinePost = async (req, res) => {
  try {
    const currentUser = await Users.findById(req.params.userId);
    console.log(currentUser);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendsPost = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendsPost));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.params.username });
    const post = await Post.findById({ userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createPost,
  getPost,
  deletePost,
  updatePost,
  likePost,
  getTimelinePost,
  getUserPosts,
};

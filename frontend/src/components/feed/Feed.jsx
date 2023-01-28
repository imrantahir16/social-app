import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import Post from "../posts/Post";
import Share from "../share/Share";
import styles from "./feed.module.css";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("render");
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get(`post/profile/${username}`)
          : await axios.get(`post/timeline/${user._id}`);
        console.log(res.data);
        setPosts(
          res.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {(!username || username === user.username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default Feed;

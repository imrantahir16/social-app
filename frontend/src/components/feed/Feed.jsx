import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import Post from "../posts/Post";
import Share from "../share/Share";
import styles from "./feed.module.css";
import { AuthContext } from "../../context/AuthContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`post/timeline/${user._id}`);
        // console.log(res.data);
        setPosts(
          res.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [user]);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default Feed;

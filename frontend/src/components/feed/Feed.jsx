import { useState, useEffect, useContext, useRef } from "react";
import axios from "../../api/axios";
import Post from "../posts/Post";
import Share from "../share/Share";
import styles from "./feed.module.css";
import { AuthContext } from "../../context/AuthContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const postRef = useRef(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // console.log("render");
    if (postRef.current === true) {
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
    }

    return () => {
      postRef.current = true;
    };
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

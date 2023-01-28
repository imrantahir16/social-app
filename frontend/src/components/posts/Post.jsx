import styles from "./post.module.css";
import { useState, useEffect } from "react";
import { ThumbUp, MoreVert } from "@mui/icons-material";
import axios from "../../api/axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setIsliked] = useState(false);
  const [user, setUser] = useState({});

  const likeHandler = () => {
    setLike(isliked ? like - 1 : like + 1);
    setIsliked((prev) => !prev);
  };

  useEffect(() => {
    // console.log(post);
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/user?userId=${post.userId}`);
        // console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [post.userId]);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <Link to={`profile/${user.username}`}>
              <img
                className={styles.profile}
                src={
                  user.profilePicture
                    ? `assets/${user.profilePicture}`
                    : "assets/profiles/noAvatar.png"
                }
                alt={`${user.username}'s profile`}
              />
            </Link>
            <span className={styles.username}>{user.username}</span>
            <span className={styles.date}>{format(post.createdAt)}</span>
          </div>
          <div className={styles.topRight}>
            <MoreVert />
          </div>
        </div>
        <div className={styles.center}>
          <span className={styles.description}>{post?.description}</span>
          <img
            className={styles.postImage}
            src={`assets/${post.image}`}
            alt=""
          />
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <span onClick={likeHandler}>
              <ThumbUp
                className={`${styles.likeIcon} ${
                  isliked ? styles.liked : styles.unliked
                }`}
              />
            </span>
            <span className={styles.likeCounter}>{like} people liked it</span>
          </div>
          <div className={styles.bottomRight}>
            <span className={styles.comment}>
              {`${post.comment} 
              ${post?.comment > 1 ? "comments" : "comment"}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;

import styles from "./post.module.css";
import { useState, useEffect, useRef } from "react";
import { ThumbUp, MoreVert } from "@mui/icons-material";
import axios from "../../api/axios";
import * as timeago from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(false);
  const [isliked, setIsliked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  const likeHandler = async () => {
    try {
      await axios.put(`post/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {}
    setLike(isliked ? like - 1 : like + 1);
    setIsliked((prev) => !prev);
  };

  useEffect(() => {
    setIsliked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    setLike(post.likes.length);
  }, [post]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/user?userId=${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [post.userId]);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <Link to={`/profile/${user.username}`}>
              <img
                className={styles.profile}
                src={
                  user?.profilePicture
                    ? `${PF}profiles/${user.profilePicture}`
                    : `${PF}profiles/noAvatar.png`
                }
                alt={`${user.username}'s profile`}
              />
            </Link>
            <span className={styles.username}>{user.username}</span>
            <span className={styles.date}>
              {timeago.format(post.createdAt)}
            </span>
          </div>
          <div className={styles.topRight}>
            <MoreVert />
          </div>
        </div>
        <div className={styles.center}>
          <span className={styles.description}>{post?.description}</span>
          {post?.image && (
            <img
              className={styles.postImage}
              src={`${PF}post/${post?.image}`}
              alt=""
            />
          )}
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
              {`${post?.comment ? post.comment : 0} 
              ${post?.comment > 1 ? "comments" : "comment"}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

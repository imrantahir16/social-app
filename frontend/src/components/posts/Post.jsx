import styles from "./post.module.css";
import { useState } from "react";
import { ThumbUp, MoreVert } from "@mui/icons-material";
import { Users } from "../../utils/DummyData";
const Post = ({ post }) => {
  const [like, setLike] = useState(post.like);
  const [isliked, setIsliked] = useState(false);

  const likeHandler = () => {
    setLike(isliked ? like - 1 : like + 1);
    setIsliked((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <img
              className={styles.profile}
              src={
                Users.filter((user) => user.id === post?.userId)[0]
                  .profilePicture
              }
              alt={`${
                Users.filter((user) => user.id === post?.userId)[0].username
              }'s profile`}
            />
            <span className={styles.username}>
              {Users.filter((user) => user.id === post?.userId)[0].username}
            </span>
            <span className={styles.date}>{post.date}</span>
          </div>
          <div className={styles.topRight}>
            <MoreVert />
          </div>
        </div>
        <div className={styles.center}>
          <span className={styles.description}>{post?.desc}</span>
          <img className={styles.postImage} src={post.photo} alt="" />
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

import { Posts } from "../../utils/DummyData";
import Post from "../posts/Post";
import Share from "../share/Share";
import styles from "./feed.module.css";

const Feed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Share />
        {Posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default Feed;

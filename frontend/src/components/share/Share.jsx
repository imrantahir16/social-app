import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";
import styles from "./share.module.css";

const Share = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <img
            className={styles.profileImage}
            src="assets/profiles/1.jpg"
            alt=""
          />
          <textarea
            className={styles.input}
            rows={3}
            placeholder="what you want to share"
          />
        </div>
        <hr className={styles.hr} />
        <div className={styles.bottom}>
          <div className={styles.options}>
            <div className={styles.option}>
              <PermMedia className={styles.icon} />
              <span className={styles.optionText}>Photo or Video</span>
            </div>
            <div className={styles.option}>
              <Label className={styles.icon} />
              <span className={styles.optionText}>Tag</span>
            </div>
            <div className={styles.option}>
              <Room />
              <span className={styles.optionText}>Location</span>
            </div>
            <div className={styles.option}>
              <EmojiEmotions className={styles.icon} />
              <span className={styles.optionText}>Feelings</span>
            </div>
          </div>
          <button className={styles.button}>Share</button>
        </div>
      </div>
    </div>
  );
};
export default Share;

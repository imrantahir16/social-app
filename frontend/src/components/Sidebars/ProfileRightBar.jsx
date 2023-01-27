import styles from "./profileRightBar.module.css";

const ProfileRightBar = () => {
  return (
    <>
      <h4 className={styles.title}>User Infromations</h4>
      {/* will change it with list item */}
      <div className={styles.userInfo}>
        <div className={styles.info}>
          <span className={styles.infoKey}>City:</span>
          <span className={styles.infoValue}>Islamabad</span>
        </div>
        <div className={styles.info}>
          <span className={styles.infoKey}>From:</span>
          <span className={styles.infoValue}>Lahore</span>
        </div>
        <div className={styles.info}>
          <span className={styles.infoKey}>Relationship:</span>
          <span className={styles.infoValue}>Married</span>
        </div>
      </div>
      <h4 className={styles.title}>User Friends</h4>
      {/* will change it with list item */}
      <div className={styles.followings}>
        <div className={styles.following}>
          <img
            className={styles.followingImg}
            src="assets/profiles/1.jpg"
            alt=""
          />
          <span className={styles.followingName}>John Doe</span>
        </div>
        <div className={styles.following}>
          <img
            className={styles.followingImg}
            src="assets/profiles/2.jpg"
            alt=""
          />
          <span className={styles.followingName}>John Doe</span>
        </div>
        <div className={styles.following}>
          <img
            className={styles.followingImg}
            src="assets/profiles/3.jpg"
            alt=""
          />
          <span className={styles.followingName}>John Doe</span>
        </div>
        <div className={styles.following}>
          <img
            className={styles.followingImg}
            src="assets/profiles/4.jpg"
            alt=""
          />
          <span className={styles.followingName}>John Doe</span>
        </div>
        <div className={styles.following}>
          <img
            className={styles.followingImg}
            src="assets/profiles/5.jpg"
            alt=""
          />
          <span className={styles.followingName}>John Doe</span>
        </div>
      </div>
    </>
  );
};
export default ProfileRightBar;

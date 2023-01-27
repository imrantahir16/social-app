import HomeRightBar from "./HomeRightBar";
import ProfileRightBar from "./ProfileRightBar";
import styles from "./rightSideBar.module.css";

const RightSideBar = ({ profile }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};
export default RightSideBar;

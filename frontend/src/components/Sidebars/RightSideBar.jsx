import HomeRightBar from "./HomeRightBar";
import ProfileRightBar from "./ProfileRightBar";
import styles from "./rightsidebar.module.css";

const RightSideBar = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {user ? <ProfileRightBar user={user} /> : <HomeRightBar />}
      </div>
    </div>
  );
};
export default RightSideBar;

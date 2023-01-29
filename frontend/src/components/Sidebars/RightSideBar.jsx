import HomeRightBar from "./HomeRightBar";
import ProfileRightBar from "./ProfileRightBar";
import styles from "./rightSideBar.module.css";

const RightSideBar = ({ user }) => {
  console.log("rightsidebar");
  console.log(user);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {user ? <ProfileRightBar otherUser={user} /> : <HomeRightBar />}
      </div>
    </div>
  );
};
export default RightSideBar;

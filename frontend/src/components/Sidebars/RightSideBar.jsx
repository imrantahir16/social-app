import { useEffect } from "react";
import HomeRightBar from "./HomeRightBar";
import ProfileRightBar from "./ProfileRightBar";
import styles from "./rightSideBar.module.css";

const RightSideBar = ({ user }) => {
  // useEffect(() => {
  //   console.log("RightSideBar");
  //   console.log(user);
  // }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {user ? <ProfileRightBar user={user} /> : <HomeRightBar />}
      </div>
    </div>
  );
};
export default RightSideBar;

import styles from "./profile.module.css";
import NavBar from "../../components/navbar/NavBar";
import LeftSideBar from "../../components/Sidebars/LeftSideBar";
import Feed from "../../components/feed/Feed";
import RightSideBar from "../../components/Sidebars/RightSideBar";

const Profile = () => {
  return (
    <>
      <NavBar />
      <div className={styles.profile}>
        <LeftSideBar />
        <div className={styles.right}>
          <>
            <div className={styles.cover}>
              <img
                className={styles.coverImage}
                src="assets/post/3.jpg"
                alt=""
              />
              <img
                className={styles.profileImage}
                src="assets/profiles/4.jpg"
                alt=""
              />
            </div>
            <div className={styles.userInfo}>
              <h4 className={styles.username}>John Doe</h4>
              <span className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </div>
          </>
          <div className={styles.rightBottom}>
            <Feed />
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;

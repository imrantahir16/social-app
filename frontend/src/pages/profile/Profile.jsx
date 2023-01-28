import { useState, useEffect } from "react";
import axios from "../../api/axios";
import styles from "./profile.module.css";
import NavBar from "../../components/navbar/NavBar";
import LeftSideBar from "../../components/Sidebars/LeftSideBar";
import Feed from "../../components/feed/Feed";
import RightSideBar from "../../components/Sidebars/RightSideBar";
import { useParams } from "react-router";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    // console.log(post);
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/user/?username=${username}`);
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [username]);
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
                src={user.coverPicture}
                alt=""
              />
              <img
                className={styles.profileImage}
                src={user.profilePicture}
                alt=""
              />
            </div>
            <div className={styles.userInfo}>
              <h4 className={styles.username}>{user.username}</h4>
              <span className={styles.description}>{user.description}</span>
            </div>
          </>
          <div className={styles.rightBottom}>
            <Feed />
            <RightSideBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;

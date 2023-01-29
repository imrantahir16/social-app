import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import styles from "./profile.module.css";
import NavBar from "../../components/navbar/NavBar";
import LeftSideBar from "../../components/Sidebars/LeftSideBar";
import Feed from "../../components/feed/Feed";
import RightSideBar from "../../components/Sidebars/RightSideBar";
import { useParams } from "react-router";

const Profile = () => {
  const [user, setUser] = useState({});
  const userRef = useRef(false);
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    console.log("Profile comp");
    console.log(username);
    // if (useRef.current === true) {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/user/?username=${username}`);

        console.log("Getting user");
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();

    // return () => {
    //   userRef.current = true;
    // };
  }, [username]);

  useEffect(() => {
    // if (userRef.current === true) {
    console.log("user in profile");
    console.log(user);
    // }
  }, [user]);

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
                src={
                  user?.coverPicture
                    ? `${PF}profiles/${user.coverPicture}`
                    : `${PF}profiles/noAvatar.jpg`
                }
                alt=""
              />
              <img
                className={styles.profileImage}
                src={
                  user?.profilePicture
                    ? `${PF}profiles/${user.profilePicture}`
                    : `${PF}profiles/noAvatar.png`
                }
                alt=""
              />
            </div>
            <div className={styles.userInfo}>
              <h4 className={styles.username}>{user?.username}</h4>
              <span className={styles.description}>{user?.description}</span>
            </div>
          </>
          <div className={styles.rightBottom}>
            <Feed username={username} />
            <RightSideBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;

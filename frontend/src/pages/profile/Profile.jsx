import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import styles from "./profile.module.css";
import NavBar from "../../components/navbar/NavBar";
import LeftSideBar from "../../components/Sidebars/LeftSideBar";
import Feed from "../../components/feed/Feed";
import RightSideBar from "../../components/Sidebars/RightSideBar";
import { useParams } from "react-router";
import Post from "../../components/posts/Post";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Share from "../../components/share/Share";

const Profile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const postRef = useRef(false);
  const username = useParams().username;
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/user/?username=${username}`);
        // console.log("username");
        // console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [username]);

  useEffect(() => {
    if (postRef.current === true) {
      const fetchPosts = async () => {
        try {
          // console.log("feed");
          // console.log(username);
          const res = await axios.get(`post/profile/${username}`);
          // console.log("post by username");
          // console.log(res.data);
          setPosts(
            res.data.sort((post1, post2) => {
              return new Date(post2.createdAt) - new Date(post1.createdAt);
            })
          );
        } catch (error) {
          console.log(error);
        }
      };
      fetchPosts();
    }

    return () => {
      postRef.current = true;
    };
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
            {/* <Feed username={username} /> */}
            <div className={styles.container}>
              <div className={styles.wrapper}>
                {currentUser.username === user.username && <Share />}
                {posts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </div>
            </div>
            <RightSideBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;

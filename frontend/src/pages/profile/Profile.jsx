import { useState, useEffect } from "react";
import axios from "../../api/axios";
import styles from "./profile.module.css";
import NavBar from "../../components/navbar/NavBar";
import LeftSideBar from "../../components/sidebars/LeftSideBar";
import RightSideBar from "../../components/sidebars/RightSideBar";
import { useParams } from "react-router";
import Post from "../../components/posts/Post";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Share from "../../components/share/Share";

const Profile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
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
        console.error(error);
      }
    };
    fetchUsers();
  }, [username]);

  useEffect(() => {
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
        console.error(error);
      }
    };
    fetchPosts();
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
                {posts.length < 1 && <p>Not posted yet</p>}
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

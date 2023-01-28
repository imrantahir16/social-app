import styles from "./profileRightBar.module.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const ProfileRightBar = ({ user }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user/friend/" + user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);
  return (
    <>
      <h4 className={styles.title}>User Infromations</h4>
      {/* will change it with list item */}
      <div className={styles.userInfo}>
        <div className={styles.info}>
          <span className={styles.infoKey}>City:</span>
          <span className={styles.infoValue}>{user.city}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.infoKey}>From:</span>
          <span className={styles.infoValue}>{user.from}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.infoKey}>Relationship:</span>
          <span className={styles.infoValue}>{user.relationship}</span>
        </div>
      </div>
      <h4 className={styles.title}>User Friends</h4>
      {/* will change it with list item */}
      <div className={styles.followings}>
        {friends.map((friend) => (
          <Link
            to={"/profile" + friend.username}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.following}>
              <img
                className={styles.followingImg}
                src={
                  friends.profilePicture
                    ? friend.profilePicture
                    : "assets/profiles/noAvata.png"
                }
                alt=""
              />
              <span className={styles.followingName}>{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
export default ProfileRightBar;

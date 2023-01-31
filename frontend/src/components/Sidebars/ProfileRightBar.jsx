import styles from "./profileRightBar.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfileRightBar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const friendRef = useRef(false);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(`/user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`user/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (friendRef.current === true) {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("/user/friend/" + user?._id);
          setFriends(friendList.data);
        } catch (error) {
          console.log(error);
        }
      };
      getFriends();
    }
    return () => {
      friendRef.current = true;
    };
  }, [user]);

  useEffect(() => {
    // console.log("current user followings");
    // console.log(currentUser.followings.includes(user?._id));
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user]);

  return (
    <>
      {user._id !== currentUser._id && (
        <button className={styles.followButton} onClick={followHandler}>
          {followed ? "Unfollow" : "Follow"}
        </button>
      )}
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
        {friends.length ? (
          friends.map((friend) => (
            <Link
              key={friend._id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.following}>
                <img
                  className={styles.followingImg}
                  src={
                    friend.profilePicture
                      ? `${PF}profiles/${friend.profilePicture}`
                      : `${PF}profiles/noAvatar.png`
                  }
                  alt=""
                />
                <span className={styles.followingName}>{friend.username}</span>
              </div>
            </Link>
          ))
        ) : (
          <p>No friends</p>
        )}
      </div>
    </>
  );
};
export default ProfileRightBar;

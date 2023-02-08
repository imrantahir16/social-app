import { useEffect } from "react";
import { useState } from "react";
import axios from "../../api/axios";
import styles from "./chatOnline.module.css";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`/user/friend/${currentId}`);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  const clickHandler = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {onlineFriends.map((onlineFriend) => (
        <div
          className={styles.onlineFriend}
          onClick={() => clickHandler(onlineFriend)}
        >
          <div className={styles.imgContainer}>
            <img
              className={styles.onlineImg}
              src={
                onlineFriend?.profilePicture
                  ? `${PF}profiles/${onlineFriend.profilePicture}`
                  : `${PF}profiles/noAvatar.png`
              }
            />
            <div className={styles.onlineBadge} />
          </div>
          <span>{onlineFriend.username}</span>
        </div>
      ))}
    </div>
  );
};
export default ChatOnline;
